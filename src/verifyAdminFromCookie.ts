import {dynamo} from '@/db/dynamo';

import {cookies} from 'next/headers';
import getUserFromToken from '@/helpers/getUserFromToken';
import {Role} from '@/domain/Role';

export default async function verifyAdminFromCookie() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const user = await getUserFromToken(accessToken);

    const returnValue = user?.role === Role.admin;

    return returnValue;
}
