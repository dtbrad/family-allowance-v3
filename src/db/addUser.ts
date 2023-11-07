import {dynamo} from './dynamo';
import generatePassword from '@/helpers/generatePassword';

const salt = process.env.SALT || '';
const tableName = process.env.TABLE_NAME || '';

export interface AddUserParams {
    userId: string;
    password: string;
    allowanceAmount: string;
    dayPreference: string;
}

export default async function addUser({
    userId,
    password,
    allowanceAmount,
    dayPreference
}: AddUserParams) {
    const lowerCaseUserId = userId.toLowerCase();

    await dynamo
        .put({
            TableName: tableName,
            Item: {
                PK: lowerCaseUserId,
                SK: lowerCaseUserId,
                role: 'standard',
                passwordDigest: generatePassword(password, salt),
                allowanceAmount,
                dayPreference,
                balance: 0,
                userId: lowerCaseUserId
            },
            ConditionExpression: 'attribute_not_exists(PK)'
        })
        .promise();
}
