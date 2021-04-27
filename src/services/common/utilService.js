import { BehaviorSubject } from 'rxjs';


const loaderSubject = new BehaviorSubject(false);
const notificationSubject = new BehaviorSubject({ pendingItems: 0 });




export const LoaderService = {
    sendLoad: (load) => loaderSubject.next(load),
    clearLoad: () => loaderSubject.next(),
    getLoad: () => loaderSubject.asObservable()
};

export const NotificationService = {
    setNotification: (notificationObject) => notificationSubject.next(notificationObject),
    getNotification : () => notificationSubject.asObservable(),
};

