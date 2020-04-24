import 'reflect-metadata';
import { Container } from 'inversify';
import React from 'react';
import ReactDOM from 'react-dom';
import { injectable, inject } from 'inversify';

@injectable()
export class Simple {
}

@injectable()
class Composed {
    private readonly simple: Simple;

    constructor(@inject(Simple) simple: Simple) {
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
