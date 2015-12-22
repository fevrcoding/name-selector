import expect from 'expect';

import * as utils from '../assets/javascripts/utils';

describe('Utility Functions', () => {


    describe('toTitleCase()', () => {

        it('should return a capitalized string', () => {

            expect(utils.toTitleCase('ALL CAPS')).toBe('All Caps');
            expect(utils.toTitleCase('lowercase caps')).toBe('Lowercase Caps');

            //with prefix
            expect(utils.toTitleCase('d\'lowercase caps')).toBe('d\'Lowercase Caps');

        });

    });

    describe('noop()', () => {

        it('should be an empty function', () => {
            expect(typeof utils.noop).toBe('function');
            expect(utils.noop()).toBe(undefined);
        });
    });


});