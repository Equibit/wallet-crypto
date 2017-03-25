build:
	-mkdir dist
	npm browserify index.js --standalone WalletCryptoUtils > dist/wallet-crypto.js
	-npm browserify index.js --standalone WalletCryptoUtils | npm uglifyjs > dist/wallet-crypto.min.js
publish:
	git push
	git push --tags
	make build
	-git branch -D release
	git checkout -b release && git add -f dist/ && git commit -am \"Update dist for release\"
	git push -f origin release
	npm publish --access public
	git checkout -
	git branch -D release