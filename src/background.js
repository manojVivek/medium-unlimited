import intercept from './request_interceptors'; //Importing just to make sure the interceptors are registered.
import {init} from './utils';

//Initialize global handlers
init();

intercept();