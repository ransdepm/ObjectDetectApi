import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

const ObjectDetectors = require('./object_detector/ObjectDetectors.js');

global.regeneratorRuntime = require('babel-runtime/regenerator');


export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.post('/detect_image_objects',  async (req, res) => {
		const data = req.body.data;
		const type = req.body.type;
		const objectDetect = new ObjectDetectors(data, type);
		const results =  await objectDetect.process();
		res.json(results);
	});

	return api;
}
