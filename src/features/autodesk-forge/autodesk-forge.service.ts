import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateAutodeskForgeDto } from './dto/create-autodesk-forge.dto';
import { UpdateAutodeskForgeDto } from './dto/update-autodesk-forge.dto';
import * as ForgeSDK from 'forge-apis';
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as qs from 'qs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AutodeskForgeService {
	constructor(private httpService: HttpService, private configService: ConfigService) {}

	create(createAutodeskForgeDto: CreateAutodeskForgeDto) {
		return 'This action adds a new autodeskForge';
	}

	findAll() {
		return `This action returns all autodeskForge`;
	}

	findOne(id: number) {
		return `This action returns a #${id} autodeskForge`;
	}

	update(id: number, updateAutodeskForgeDto: UpdateAutodeskForgeDto) {
		return `This action updates a #${id} autodeskForge`;
	}

	remove(id: number) {
		return `This action removes a #${id} autodeskForge`;
	}

	getToken(): Observable<AxiosResponse<any>> {
		const url = 'https://developer.api.autodesk.com/authentication/v1/authenticate';
		const body = {
			client_id: this.configService.get('FORGE_CLIENT_ID'),
			client_secret: this.configService.get('FORGE_CLIENT_SECRET'),
			grant_type: 'client_credentials',
			scope: 'data:read',
		};
		const data = qs.stringify(body);
		const options = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};
		return this.httpService.post(url, data, options).pipe(
			map((response) => response.data),
			catchError((e) => of(e)),
		);
	}

	async getToken2() {
		const autoRefresh = true;
		const scopes: ForgeSDK.Scope[] = ['data:read', 'data:write'];
		const oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(
			this.configService.get('FORGE_CLIENT_ID'),
			this.configService.get('FORGE_CLIENT_SECRET'),
			scopes,
			autoRefresh,
		);
		return await oAuth2TwoLegged.authenticate();
	}
}
