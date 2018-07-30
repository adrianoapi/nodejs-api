//server/repository/NoteRepository.js

const db       = require('../config/mongo');
const bluebird = require('bluebird'       );

function getQuery(_id){
	return { _id: db.ObjectId(_id) }
}

const NoteRepository = {
	find(query, callback){
		db.collection('notes').find(query, callback);
	},
	findById(_id, callback){
		db.collection('notes').findOne(getQuery(_id), callback);
	},
	create(data, callback){
		db.collection('notes').insert(data, callback);
	},
	update(_id, data, callback){
		db.collection('notes').update(getQuery(_id), { $set: data }, callback)
	},
	delete(_id, callback){
		db.collection('notes').remove(getQuery(_id), callback);
	}
};

module.exports = bluebird.promisifyAll(NoteRepository);