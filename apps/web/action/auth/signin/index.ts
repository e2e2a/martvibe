'use server';
import { findUserByEmail } from '@/service/user';
import { comparePassword } from '@/lib/helpers/hash';
import { tryCatch } from '@/lib/helpers/tryCatch';
import { SigninValidator } from '@/lib/validators/signin';
import { signIn } from '@/auth';
//: Promise<{ message?: string; status: number; error?: string; token?: string }>
export const signInAction = async (data: any) => {
  return tryCatch(async () => {
    const validatedFields = SigninValidator.safeParse(data);
    if (!validatedFields.success) return { message: 'Invalid fields!', status: 400 };

    const checkedUser = await checkUser(validatedFields.data);
    if (!checkedUser || checkedUser.error)
      return {
        message: 'Post updated successfully!',
        token: checkedUser?.token,
        status: checkedUser.status,
      };

    const signedIn = await handleSignIn(
      checkedUser.user._id,
      checkedUser.user.email,
      checkedUser.user.password
    );
    if (signedIn && signedIn.error) return { message: signedIn.error, status: signedIn.status };

    return { message: 'Post updated successfully!', role: checkedUser.user.role, status: 200 };
  });
};

/**
 * Verifies the user's credentials and checks various conditions for login.
 *
 * @param {any} data - The user-provided sign-in data, including email and password.
 */
const checkUser = async (data: any) => {
  return tryCatch(async () => {
    const existingUser = await findUserByEmail(data.email);
    if (existingUser && existingUser.revoke)
      return { error: 'Account has been revoked by admin.', status: 403 };

    if (!existingUser || !existingUser.email || !existingUser.password)
      return { error: 'Incorrect email or password.', status: 403 };
    if (!existingUser.verified) return { error: 'Email is not verified yet.', status: 403 };

    const isMatch = await comparePassword(data.password, existingUser.password as string);
    if (!isMatch) return { error: 'Incorrect email or password.', status: 403 };

    // const checkedIp = await checkIp(existingUser);
    // if (checkedIp && checkedIp.error) return { error: 'Confirming Email', token: checkedIp.token, status: 203 };
    return { message: 'yesyes', user: existingUser, status: 201 };
  });
};

/**
 * Handles the sign-in process using NextAuth credentials.
 *
 * @param {string} id
 * @param {string} email
 * @param {string} [password]
 *
 * @returns The result object containing either a success message with status or an error message with status.
 */
export const handleSignIn = async (id: string, email: string, password?: string) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return { message: 'Login successful', status: 201 };
  } catch (err) {
    console.log('err', err);
    return { error: 'Invalid Credentials.', status: 401 };
  }
};
