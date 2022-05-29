import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const QUERY_URL = 'https://api.github.com/search/users?q=';

export default class GithubProfileSearch extends LightningElement {
    userProfile = {
        Name : 'Varun Deshmukh',
        ImageSrc : 'https://i.pravatar.cc/200',
        Description : 'This is Varun Deshmukh'
    }

    searchKey;
    @track userProfiles;
    @track errorResponse;

    searchFieldChangeHandler(event){
        console.log('VSD event.keyCode :: ' + event.keyCode);
        if (event.keyCode === 13){
            this.searchKey = event.target.value;
            console.log('VSD searchKey :: ' + this.searchKey);
            console.log('VSD endPoint :: ' + QUERY_URL + this.searchKey);
    
            fetch(QUERY_URL + this.searchKey).then(response => {
                if (!response.ok) {
                    this.error = response;
                }
                return response.json();
            })
            .then(jsonResponse => {
                this.userProfiles = jsonResponse;
            })
            .catch(error => {
                this.userProfiles = error;
                this.userProfiles = undefined;
            });
        }
    }
/*
    @track searchKey = 'Kumaresan';
    @track profiles;
    @track error;
    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
        fetch(QUERY_URL + this.searchKey)
            .then(response => {
                if (!response.ok) {
                    this.error = response;
                }
                return response.json();
            })
            .then(jsonResponse => {
                this.profiles = jsonResponse;
            })
            .catch(error => {
                this.profiles = error;
                this.profiles = undefined;
            });
    }
*/
    get isProfileThere(){
        if(this.userProfiles)
            return true;
        return false;
    }

    showToast(title, variant, message){
        const toastEvent = new ShowToastEvent({
            title : title,
            message : message,
            variant : variant
        });
        this.dispatchEvent(toastEvent);
    }
}