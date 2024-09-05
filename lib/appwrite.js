import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.tbl.aora',
    projectId: '66bf1895003813b6a0d0',
    databaseId: '66bf27680037e01dfdf7',
    userCollectionId: '66bf2b38000a6874b071',
    videoCollectionId: '66bf2bf7000553295dc9',
    transactionCollectionId: '66ce33450031581f9238',
    storageId: '66bf2ea80006c5346b68'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    transactionCollectionId,
    storageId
} = config;

// Init your React Native SDK
const client = new Client();
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
;

const account = new Account(client);

// Register User
export const createUser = async (email, password, username) =>{
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                password,
                avatar: avatarUrl
            }
        )
        return newUser
    } catch (error){
        console.log(error)
        throw new Error(error)
    }
}
export const signIn = async(email, password) =>{
    try {
        // await account.deleteSession('current')
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }
}
export const getCurrentUser = async() =>{
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0]
        // return currentAccount;
    } catch (error) {
        throw new Error(error);  
    }
}
export const getUserTransactions = async(userId) => {
    try {
        const transactions = await databases.listDocuments(
            databaseId,
            transactionCollectionId,
            [Query.equal('users', userId),  Query.orderDesc('$createdAt')]
        )

        const totalBalance = transactions.documents.reduce((sum, transaction) => sum + transaction.amount, 0);
        const expenses = transactions.documents.filter(transaction => transaction.amount < 0);
        const income = transactions.documents.filter(transaction => transaction.amount > 0);

        // Calculate the sum of negative, positive, and all transactions
        const totalExpense = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);
        const totalIncome = income.reduce((sum, transaction) => sum + transaction.amount, 0);

        let transactionData = {
            data: transactions.documents,
            balance: totalBalance,
            expenses: expenses,
            income: income,
            totalExpense: totalExpense,
            totalIncome: totalIncome
        }
        return transactionData
    } catch (error) {
        throw new Error(error);
    }
}
export const getAllLatestTransactions = async(userId) => {
    try {
        const transactions = await databases.listDocuments(
            databaseId,
            transactionCollectionId,
            [Query.equal('users', userId),  Query.orderDesc('$createdAt'), Query.limit(5)]
        )
        const expenses = await databases.listDocuments(
            databaseId,
            transactionCollectionId,
            [
                Query.equal('users', userId),
                Query.lessThan('amount', 0), // Filter for negative amounts
                Query.orderDesc('$createdAt'),
                Query.limit(5)
            ]
        );

        // Fetch transactions with positive amounts
        const incomes = await databases.listDocuments(
            databaseId,
            transactionCollectionId,
            [
                Query.equal('users', userId),
                Query.greaterThan('amount', 0), // Filter for positive amounts
                Query.orderDesc('$createdAt'),
                Query.limit(5)
            ]
        );
        let data = {
            transactions: transactions.documents,
            expenses: expenses.documents,
            incomes: incomes.documents
        }
        return data
    } catch (error) {
        throw new Error(error);
        
    }
}
export const createTransaction = async(form) => {
    try {
        const newTransaction = await databases.createDocument(
            databaseId, transactionCollectionId, ID.unique(), {
                title: form.title,
                amount: form.amount,
                date: form.date,
                users: form.userId
            }
        )
        return newTransaction
    } catch (error) {
        throw new Error(error);
        
    }
}
export const signOut = async () => {
    try {
       const session = await account.deleteSession('current')
       return session
    } catch (error) {
        throw new Error(error)
    }
}


