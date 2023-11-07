import {dynamo} from './dynamo';

const tableName = process.env.TABLE_NAME || '';

export default async function deleteUser(userId: string) {
    const lowerCaseUserId = userId.toLowerCase();

    await dynamo
        .delete({
            TableName: tableName,
            Key: {PK: lowerCaseUserId, SK: lowerCaseUserId}
        })
        .promise();
}
