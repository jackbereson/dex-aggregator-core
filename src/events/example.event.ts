/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorHelper } from '../helpers';

import { BaseEvent } from '@/base/baseEvent';
import { EventErrorTypeEnum } from '@/constants/event.const';

interface Example {
    settings: any[];
}
class ExampleEvent extends BaseEvent<Example> {
    constructor() {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async parseData(data: any) {}

    async toJSON(data: any) {
        return data;
    }
}

const exampleEvent = new ExampleEvent();

exampleEvent.regisRule(EventErrorTypeEnum.example_1, async (data: Example) => {
    console.log('funcExample1');
});

exampleEvent.regisRule(EventErrorTypeEnum.example_2, async (data: Example) => {
    console.log('ERROR NE`');
    throw ErrorHelper.createUserError('Có lỗi xảy ra');
});

export { exampleEvent };
