import React from 'react';
import {shallow, mount} from 'enzyme';

import Game from './game';

describe('<Game />', () => {

    it('render without crashing', () => {
        shallow(<Game />);
    })

    it('renders feedback', () => {
        const feedback = 'ready player';
        const wrapper = shallow(<Game feedback={feedback} />);
        expect(wrapper.contains(<h2>{feedback}</h2>));

    })

    it('renders guess count', () => {
        const guessCount = Math.floor(Math.random() * 100) + 1
        const wrapper = shallow(<Game guessCount={guessCount} />);
        expect(wrapper.contains(<h2>{guessCount}</h2>));
    })

    it('user can make a guess', () => {
        const wrapper = shallow(<Game />);

        const theGuess = Math.floor(Math.random() * 100) + 1;

        wrapper.setState({
            correctAnswer: Math.floor(Math.random() * 100) + 1
        })
        
        wrapper.instance().makeGuess(theGuess)
        expect(wrapper.state('feedback')).not.toBe('null')
        
    })

    it('user can restart their game', () => {

        const wrapper = shallow(<Game />);
        wrapper.setState({
            guesses: [20, 40, 60, 80],
            feedback: 'this is a test',
            correctAnswer: -1
        })

        wrapper.instance().restartGame();
        expect(wrapper.state('guesses')).toEqual([]);
        expect(wrapper.state('feedback')).toEqual('Make your guess!');
        expect(wrapper.state('correctAnswer')).toBeGreaterThan(-1);
        expect(wrapper.state('correctAnswer')).toBeLessThan(101);

    })

})