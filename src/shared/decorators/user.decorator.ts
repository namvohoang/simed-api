import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { jwtSecret } from '../../app.config';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest();
	if (!!req.user) {
		return !!data ? req.user[data] : req.user;
	}

	const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
	if (token && token[1]) {
		const decoded: any = jwt.verify(token[1], jwtSecret);
		return !!data ? decoded[data] : decoded.user;
	}
});
