/**
 * @licence
 * @author Sergey Melyukov 2016
 */

(function() {
	/**
	 * Inject method with name `extName` to `PromiseConstructor`
	 *
	 * @param {Function|String=} PromiseConstructor which constructor should be extended
	 *                           If not defined, then default promise-constructor will be used
	 * @param {String=} extName name of the method. If not defined, then 'delay' will be used
	 *
	 * @returns {Function}
	 *
	 * @throws {Error}
	 */
	function inject(PromiseConstructor, extName) {
		if (typeof PromiseConstructor === 'string') {
			extName = PromiseConstructor;
		}

		extName = typeof extName === 'string' ? extName : 'delay';

		PromiseConstructor =
			(typeof PromiseConstructor === 'function' && PromiseConstructor) ||
			(typeof Promise === 'function' && Promise) || null;

		if (!PromiseConstructor) {
			throw new Error('Wrong constructor is passed or browser doesn\'t support promises');
		}

		/**
		 * Delay promise
		 * Will be resolved after `ms` milliseconds. 1000 by default
		 *
		 * @param {number=} ms
		 *
		 * @return {Promise}
		 */
		PromiseConstructor[extName] = function(ms) {
			ms = ms || 1000;

			if (this instanceof PromiseConstructor) {
				return this.then(function(value) {
					return PromiseConstructor[extName](ms).then(function() {
						return value;
					});
				});
			} else {
				return new PromiseConstructor(function(resolve) {
					setTimeout(resolve, ms);
				});
			}
		};

		if (typeof PromiseConstructor === 'function' && PromiseConstructor.prototype && PromiseConstructor.prototype.constructor === PromiseConstructor) {
			PromiseConstructor.prototype[extName] = PromiseConstructor[extName];
		}

		return PromiseConstructor;
	}

	var root = (typeof self == 'object' && self.self === self && self) ||
		(typeof global == 'object' && global.global === global && global);

	if (typeof define === 'function' && define.amd) {
		define(function() {
			return inject;
		});
	} else if (typeof module === 'object' && module && module.exports) {
		module.exports = inject;
	} else {
		root.PromiseDelay = inject;
	}
})();
