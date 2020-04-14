import 'reflect-metadata';
import { Container } from 'inversify';
import React from 'react';
import ReactDOM from 'react-dom';
import { injectable } from 'inversify';

@injectable()
export class Simple {
}

@injectable()
export class Composed {
	simple: Simple;

	// ERROR: Module parse failed: Unexpected character '@'
	// constructor(@inject simple: Simple) {
	// 	this.simple = simple;
	// }

	// Error: Missing required @inject or @multiInject annotation in: argument 0 in class Composed.
	constructor(simple: Simple) {
		this.simple = simple;
	}
}

const container = new Container();
container.bind(Simple).toSelf();
container.bind(Composed).toSelf();
console.log(container.get(Composed));

function Main() {
	return <div>
		{JSON.stringify(container.get(Composed))}
	</div>;
}

ReactDOM.render(<Main/>, document.getElementById('root'));
