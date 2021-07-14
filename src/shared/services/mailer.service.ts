import { Injectable } from '@nestjs/common';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { Logger } from '../../logger/logger.decorator';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class MailerService {
	constructor(
		@InjectSendGrid() private readonly mailClient: SendGridService,
		@Logger('MailerService') private readonly logger: LoggerService,
	) {}

	async sendMail(
		toEmail: string,
		fromEmail: string,
		subject: string,
		text: string,
		html: string,
	) {
		console.log({
			to: toEmail,
			from: fromEmail,
			subject: subject,
			text: text,
			html: html,
		});
		try {
			await this.mailClient.send({
				to: toEmail,
				from: fromEmail,
				subject: subject,
				text: text,
				html: html,
			});
		} catch (error) {
			if (error.response) {
				this.logger.log(error.response.body);
			} else {
				this.logger.log('send mail error: ' + error);
			}
		}
	}
}
