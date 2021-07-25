import { HttpService } from '@nestjs/axios';
import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAutodeskForgeDto } from './dto/create-autodesk-forge.dto';
import { UpdateAutodeskForgeDto } from './dto/update-autodesk-forge.dto';
import * as ForgeSDK from 'forge-apis';
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as qs from 'qs';
import { catchError, map } from 'rxjs/operators';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UploadObjectDto } from './dto/upload-object.dto';

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

	async get2LeggedToken() {
		const scopes: ForgeSDK.Scope[] = ['data:read', 'data:write', 'bucket:create', 'bucket:update', 'bucket:read', 'data:create'];
		const oAuth2TwoLegged = this.getOauth2Client(scopes, true);
		return await oAuth2TwoLegged.authenticate();
	}

	async createBucket(createBucketDto: CreateBucketDto) {
		const bucketApi = new ForgeSDK.BucketsApi();
		const { bucketKey, allow, policyKey } = createBucketDto;
		const postBuckets: ForgeSDK.PostBucketsPayload = { bucketKey, policyKey };
		if (allow) {
			postBuckets.allow = [allow];
		}
		const options = { xAdsRegion: 'US' };
		const scopes: ForgeSDK.Scope[] = ['data:read', 'data:write', 'bucket:create', 'bucket:update', 'bucket:read', 'data:create'];
		const oauth2client = this.getOauth2Client(scopes, true);
		const credentials = await this.get2LeggedToken();
		try {
			return await bucketApi.createBucket(postBuckets, options, oauth2client, credentials);
		} catch (e) {
			throw new HttpException(e.statusBody?.reason || e.statusMessage, e.statusCode);
		}
	}

	async uploadObject(uploadObjectDto: UploadObjectDto) {
		const objectApi = new ForgeSDK.ObjectsApi();
		const { bucketKey, file } = uploadObjectDto;
		const { originalname, size, buffer } = file;
		const options = { contentDisposition: originalname };
		const scopes: ForgeSDK.Scope[] = ['data:read', 'data:write', 'bucket:create', 'bucket:update', 'bucket:read', 'data:create'];
		const oauth2client = this.getOauth2Client(scopes, true);
		const credentials = await this.get2LeggedToken();
		try {
			return await objectApi.uploadObject(bucketKey, originalname, size, buffer, options, oauth2client, credentials);
		} catch (e) {
			throw new HttpException(e.statusBody?.reason || e.statusMessage, e.statusCode);
		}
	}

	getOauth2Client(scopes: ForgeSDK.Scope[], autoRefresh: boolean): ForgeSDK.AuthClientTwoLegged {
		return new ForgeSDK.AuthClientTwoLegged(
			this.configService.get('FORGE_CLIENT_ID'),
			this.configService.get('FORGE_CLIENT_SECRET'),
			scopes,
			autoRefresh,
		);
	}
}
