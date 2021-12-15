
rm -r ./backend/src/build
cd ./frontend
npm run build
cp -R ./build ../backend/src
cd ../backend
npm start
sleep 3000