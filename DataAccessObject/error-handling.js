let uuid_generator = require("./uuid-generator");

class ErrorManager {
	#err;
	#dboperation_data;
	constructor(err, dboperation_data) {
		this.#err = err;
		this.#dboperation_data = dboperation_data;
	}

	errorIdentifier() {
		let err_handler_object = new ErrorHandler(this.#dboperation_data);
		if (this.#err.code === "ER_DUP_ENTRY") {
			console.log(`Duplicate Entry !!\nRow NOT Inserted !!`);
			const match = this.#err.sqlMessage.match(/'([^']+)'$/);

			if (match[1] === `${this.#dboperation_data.table_name}.PRIMARY`) {
				console.log(`Repeated primary key in a column is observed`);
				err_handler_object.repeatedPrimaryKey();
			}

			if (this.#dboperation_data.unique_id[0]) {
				for (var u of this.#dboperation_data.unique_id) {
					if (match[1] === `${this.#dboperation_data.table_name}.${u}_UNIQUE`) {
						console.log(`ROW aldready exists`);
					}
				}
			}

			if (this.#dboperation_data.unique_key[0]) {
				for (var u of this.#dboperation_data.unique_key) {
					if (
						match[1] === `${this.#dboperation_data.table_name}.${u}` ||
						match[1] === `${this.#dboperation_data.table_name}.${u}_UNIQUE`
					) {
						let error_value = this.#err.sqlMessage.match(/'([^']+)'/);
						err_handler_object.uniquenessError(error_value[1]);
					}
				}
			}
		}

		if (
			this.#err.code === "ER_NO_REFERENCED_ROW_2" ||
			this.#err.code === "ER_NO_REFERENCED_ROW"
		) {
			err_handler_object.foreignKeyNotExist();
		}
	}

	updateErrorIdentifier() {
		let update_err_handler_object = new UpdateErrorHandler();
		if (this.#err.code === "ER_BAD_FIELD_ERROR") {
			let error_value = this.#err.sqlMessage.match(/'([^']+)'/);
			update_err_handler_object.unknownColumn(error_value[1]);
		}
		if (
			this.#err.code === "ER_NO_REFERENCED_ROW_2" ||
			this.#err.code === "ER_NO_REFERENCED_ROW"
		) {
			this.errorIdentifier();
		}
	}
}

class ErrorHandler {
	#dboperation_data;
	constructor(dboperation_data) {
		this.#dboperation_data = dboperation_data;
	}

	repeatedPrimaryKey() {
		let new_uuid = new uuid_generator().get_uuid;
		this.#dboperation_data.dto_object.primary_id = new_uuid;
		this.#dboperation_data.dao_instance[this.#dboperation_data.recall_method]();
		// this["m1"]() --> m1 is method name
	}
	uniquenessError(error_value) {
		console.log(`Your entered input ${error_value} aldready exists....`);
	}
	foreignKeyNotExist() {
		console.log(
			` There is NO primary key value for your entered foreign key value`
		);
		console.log(`or \n Cannot update/delete foreign key`);
	}
}

class UpdateErrorHandler {
	unknownColumn(error_value) {
		console.log(`Column-> ${error_value} does not exist in the table`);
	}
}

module.exports = { ErrorManager };
