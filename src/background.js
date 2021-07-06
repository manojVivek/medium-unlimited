import intercept from './request_interceptors'; //Importing just to make sure the interceptors are registered.
import {init} from './utils';
import 'webext-dynamic-content-scripts';
import addDomainPermissionToggle from 'webext-domain-permission-toggle';


//Initialize global handlers
init();

intercept();

addDomainPermissionToggle();