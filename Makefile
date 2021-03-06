build:
	rm -rf dist
	mkdir dist
	# ./node_modules/.bin/browserify index.js --standalone WalletCryptoUtils -o dist/wallet-crypto.js
	./node_modules/.bin/browserify index.js --standalone WalletCryptoUtils | ./node_modules/.bin/uglifyjs > dist/wallet-crypto.js
	./node_modules/.bin/browserify index.js --standalone WalletCryptoUtils | ./node_modules/.bin/uglifyjs > dist/wallet-crypto.min.js
publish:
	make build
	-git branch -D release
	git checkout -b release && git add -f dist/ && git commit -am "Update dist for release"
	git push -f origin release
	npm publish --access public
	git checkout -
	git push
	git push --tags