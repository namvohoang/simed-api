import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	openMediaDevices = async (constraints) => {
		console.log('here', document);
		return await navigator.mediaDevices.getUserMedia(constraints);
	};

	async getRoot() {
		try {
			const stream = await this.openMediaDevices({ video: true, audio: true });
			console.log('Got MediaStream:', stream);
		} catch (error) {
			console.error('Error accessing media devices.', error);
		}
	}
}
