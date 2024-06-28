//yarn add mobx mobx-react mobx-persist-store
import { makeAutoObservable } from "mobx";
import {UserInfo} from "../@types/UserInfo.ts";
import { makePersistable,hydrateStore  } from 'mobx-persist-store';

class AppDataStore{
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'SampleStore',
            properties: ['user','accessToken','isLoginOpen'],
            storage: window.localStorage
        });
    }

    accessToken : string = "";
    isLoginOpen:boolean=false;
    isSignUpOpen:boolean=false;

    user: UserInfo | null = null;

    setAccessToken(token:string) {
        this.accessToken = token;
    }
    setIsLoginOpen(val:boolean) {
        this.isLoginOpen = val;
    }
    setIsSignUpOpen(val:boolean) {
        this.isSignUpOpen = val;
    }


    setUser(item: UserInfo | null ) {
        this.user = item;
    }
    async hydrateStore() {
        await hydrateStore(this);
    }
}

const store = new AppDataStore();
export default store;