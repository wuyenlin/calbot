import 'reflect-metadata';
import container from './config/container';
import Server from './server';

const server = container.resolve(Server);
server.start();
