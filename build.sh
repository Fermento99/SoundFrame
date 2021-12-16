
rm -r ./backend/src/build
cd ./frontend
npm i
npm run build
cp -R ./build ../backend/src
cd ../backend
npm i