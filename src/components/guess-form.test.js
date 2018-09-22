import React from 'react';
import {shallow, mount} from 'enzyme';

import GuessForm from './guess-form';

describe('<GuessForm />', () => {

        it('renders without crashing', () => {
            shallow(<GuessForm />);
        })


        it('triggers onMakeGuess callback', () => {
            const callback = jest.fn();
            const wrapper = mount(<GuessForm onMakeGuess={callback} />)
            const value = Math.floor(Math.random() * 100) + 1;

            wrapper.find('input[type="number"]').instance().value = value;
            wrapper.simulate('submit');
            expect(callback).toHaveBeenCalledWith(value.toString())
        })

        it('reset form on submit', () => {

            const wrapper = mount(<GuessForm />);
            const input = wrapper.find('input[type="number"]')
            input.instance().value = 10;
            wrapper.simulate('submit')
            expect(input.instance().value).toEqual('')
        })



})