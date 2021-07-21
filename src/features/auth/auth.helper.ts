import { tokenExpired } from 'src/app.config';
import { RegisterRo } from './response-object/register.ro';
import { SignInRo } from './response-object/signin.ro';
import { UserRo } from './response-object/user.ro';

export function buildSignInRO(user, jwt): SignInRo {
	return {
		token: jwt,
		refreshToken: user.refreshToken,
		expiredIn: tokenExpired,
		user: buildUserRO(user),
	};
}

export function buildRegisterRO(user, jwt): RegisterRo {
	return {
		token: jwt,
		refreshToken: user.refreshToken,
		expiredIn: tokenExpired,
		user: buildUserRO(user),
	};
}

export function buildUserRO(user): UserRo {
	return {
		phoneNumber: user.phoneNumber,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		gender: user.gender,
		dateOfBirth: user.dateOfBirth,
		id: user.id,
		isActive: user.isActive,
		isArchived: user.isArchived,
		createDateTime: user.createDateTime,
		lastChangedDateTime: user.lastChangedDateTime,
	};
}

export function buildRequestResetPasswordTokenRO(_user): any {
	return {};
}

export function buildVerifyActivatedCodeRO(_code): any {
	return {};
}

export function buildResetPasswordRO(user): any {
	return {
		user: buildUserRO(user),
	};
}
