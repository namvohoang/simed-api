import { tokenExpired } from 'src/app.config';

export function buildSignInRO(user, jwt): any {
	return {
		token: jwt,
		refreshToken: user.refreshToken,
		expiredIn: tokenExpired,
		user: buildUserRO(user),
	};
}

export function buildRegisterRO(user, jwt): any {
	return {
		token: jwt,
		refreshToken: user.refreshToken,
		expiredIn: tokenExpired,
		user: buildUserRO(user),
	};
}

export function buildUserRO(user): any {
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
