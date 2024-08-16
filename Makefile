SERVER="./src/server/app.ts"

all: compile
	echo "Done!"

production: compile image

compile:
	NODE_ENV='production'
	bun build ${SERVER} --outfile dist/server --compile

image:
	docker build -t app .

start:
	bun ${SERVER}
dev:
	bun --hot ${SERVER}

install: workspace_server
	bun install --ignore-scripts
workspace_server:
	rm -f app
	ln -s src/server app

up:
	docker compose up -d
down:
	docker compose down
serve:
	docker compose up -d --no-deps --build web

clean:
	podman rmi --all --force
	rm -f app
