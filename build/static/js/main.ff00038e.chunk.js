(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t){e.exports={today:function(){var e=new Date;return e.setHours(0),e.setMinutes(0),e.setSeconds(0),e},index:function(e,t){return e.reduce(function(e,n){return e[n[t]]=n,e},new Object)},group:function(e,t){return e.reduce(function(e,n){return e[n[t]]=e[n[t]]||new Array,e[n[t]].push(n),e},new Object)}}},119:function(e,t,n){},147:function(e,t){},150:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n.n(s),i=n(16),o=n.n(i),r=(n(67),n(3)),l=n(4),c=n(6),p=n(5),u=n(7),d=(n(69),n(60)),g=n.n(d),v=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("input",{type:"text",placeholder:"Event Name",value:this.props.newEventName,onChange:this.props.newEventNameChanged}),a.a.createElement(g.a,{onChange:this.props.newEventDateChanged,value:this.props.newEventDate})),a.a.createElement("button",{onClick:this.props.createNewEvent},"Create New Event"))}}]),t}(s.Component),m=n(40),h=n.n(m),w=n(10),f=n(41),E=function(e){function t(){var e,n;Object(r.a)(this,t);for(var s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];return(n=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(a)))).componentDidMount=function(){n.positiveAnimation=Object(f.a)({targets:".vote-count."+n.props.id,color:"#ffffff",easing:"easeOutQuart",direction:"alternate",duration:350,background:"#00B258"}),n.negativeAnimation=Object(f.a)({targets:".vote-count."+n.props.id,color:"#ffffff",easing:"easeOutQuart",direction:"alternate",duration:350,background:"#B30300"})},n.componentDidUpdate=function(e){e.votes<n.props.votes?n.positiveAnimation.restart():e.votes>n.props.votes&&n.negativeAnimation.restart()},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"vote-count "+this.props.id},this.props.votes)}}]),t}(s.Component),C=n(61),S=function(e){function t(){var e,n;Object(r.a)(this,t);for(var s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];return(n=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(a)))).dropDownStyle={borderRadius:"3px",boxShadow:"0 2px 12px rgba(0, 0, 0, 0.1)",background:"rgba(255, 255, 255, 0.9)",padding:"2px 0",fontSize:"90%",position:"fixed",overflow:"auto",maxHeight:"50%","z-index":"1"},n.doesNameContainInput=function(e,t){return-1!==e.toLowerCase().indexOf(t.toLowerCase())},n.viewingAsMember=function(e){return n.props.loggedInAs&&void 0!==e.find(function(e){return e.id===n.props.loggedInAs.id})},n.votedFor=function(e){return n.props.loggedInAs&&void 0!==e.votes.find(function(e){return e.user_id===n.props.loggedInAs.id})},n.viewingAsCreator=function(){return n.props.loggedInAs&&n.props.loggedInAs.id===n.props.data.created_by},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=Object(w.index)(this.props.invitableUsers,"id"),n=this.props.invites.filter(function(e){return e.accepted});n.push({user_id:this.props.data.created_by}),n=n.map(function(e){return t[e.user_id]});var s=this.props.invites.filter(function(e){return!e.accepted}).map(function(e){return t[e.user_id]}),i=this.viewingAsMember(n),o=this.props.placeSuggestions.sort(function(e,t){return t.votes.length-e.votes.length}),r=this.props.invitableUsers.filter(function(t){return!e.props.loggedInAs||t.id!==e.props.loggedInAs.id}),l=this.props.mousedOverSuggestion&&this.props.mousedOverSuggestion.votes.map(function(e){return e.user_id})||[];return a.a.createElement("div",{className:"event-display"},a.a.createElement("div",{className:"event-display-main"},a.a.createElement("div",{className:"event-display-members"},a.a.createElement("div",{className:"invited-users-list"},a.a.createElement("div",null,"Users going:"),n.map(function(e){return a.a.createElement("div",{key:e.id,className:l.includes(e.id)?"voted-user":""},e.name)}))),a.a.createElement("div",{className:"event-display-title"},a.a.createElement("span",{className:"event-name"},this.props.data.name,this.viewingAsCreator()?a.a.createElement("span",{className:"delete-event-button",onClick:function(){return e.props.removeEvent(e.props.data.id)}}," (Delete)"):null),a.a.createElement("span",{className:"event-date"},new Date(this.props.data.event_date).toLocaleString()),this.props.eventOwned?a.a.createElement("div",{className:"invite-user-field"},a.a.createElement("div",{className:"invite-user-label"},"Invite to Event"),a.a.createElement(h.a,{getItemValue:function(e){return e.name},items:r,renderItem:function(t,n){return a.a.createElement("div",{style:{background:n?"lightgray":"white",color:void 0!==e.props.invites.find(function(e){return e.user_id===t.id})?"#67960f80":"black"}},t.name)},value:this.props.invitingUserText,onChange:function(t){return e.props.invitingUserTextChanged(t.target.value)},onSelect:function(t,n){return e.props.inviteUser(n.id,e.props.data.id)},shouldItemRender:function(t,n){return e.doesNameContainInput(t.name,n)},menuStyle:this.dropDownStyle})):null),a.a.createElement("div",{className:"event-display-members"},a.a.createElement("div",{className:"invited-users-list"},a.a.createElement("div",null,"Users already invited:"),s.map(function(e){return a.a.createElement("div",{key:e.id},e.name)})),this.props.loggedInAs&&void 0!==s.find(function(t){return t.id===e.props.loggedInAs.id})?a.a.createElement("div",{className:"join-event"},a.a.createElement("button",{className:"join-event-button",onClick:function(){return e.props.acceptInvitation(e.props.data.id)}},"Join Event")):null)),i?a.a.createElement("div",{className:"event-display-place-suggestion"},a.a.createElement("div",{className:"invite-user-label"},"Suggest a Place"),a.a.createElement(h.a,{getItemValue:function(e){return e.placeName},items:this.props.placeSearchAutocompletes,renderItem:function(e,t){return a.a.createElement("div",{style:{background:t?"lightgray":"white"}},e.placeName)},value:this.props.placeSearchText,onChange:function(t){return e.props.placeSearchTextChanged(t.target.value)},onSelect:function(t,n){return e.props.suggestPlace(n.placeID,n.placeName,e.props.data.id)},shouldItemRender:function(t,n){return e.doesNameContainInput(t.placeName,n)},menuStyle:this.dropDownStyle})):null,a.a.createElement("div",{className:"event-display-place-list"},a.a.createElement(C.a,null,o.map(function(t){var n=e.votedFor(t),s="event-display-place-list-entry"+(n?" voted-for":""),o="".concat(t.google_place_id).concat(e.props.data.id);return a.a.createElement("div",{className:"event-display-place-list-entry-container",key:o,onMouseOver:function(){return e.props.placeMousedOver({event_id:e.props.data.id,google_place_id:t.google_place_id})},onMouseOut:function(){return e.props.placeMousedOver(null)}},a.a.createElement(E,{votes:t.votes.length,id:o}),i?a.a.createElement("div",{className:"".concat(s," clickable"),onClick:function(){return e.props.placeClickedOn(t.google_place_id,e.props.data.id,n)}},t.name):a.a.createElement("div",{className:"".concat(s)},t.name))}))))}}]),t}(s.Component),b=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=Object(w.group)(this.props.invites,"event_id"),n=Object(w.group)(this.props.placeSuggestions,"event_id"),s=this.props.events.sort(function(e,t){return new Date(e.event_date).getTime()-new Date(t.event_date).getTime()});return a.a.createElement("div",{className:"events-list"},s.map(function(s){return a.a.createElement(S,{data:s,key:s.id,invitableUsers:e.props.invitableUsers,invitingUserText:e.props.invitingUserText,invitingUserTextChanged:e.props.invitingUserTextChanged,inviteUser:e.props.inviteUser,invites:t[s.id]||[],loggedInAs:e.props.loggedInAs,eventOwned:e.props.loggedInAs&&e.props.loggedInAs.id===s.created_by,acceptInvitation:e.props.acceptInvitation,placeSearchText:e.props.placeSearchText,placeSearchTextChanged:e.props.placeSearchTextChanged,placeSearchAutocompletes:e.props.placeSearchAutocompletes,suggestPlace:e.props.suggestPlace,placeSuggestions:n[s.id]||[],placeClickedOn:e.props.placeClickedOn,placeMousedOver:e.props.placeMousedOver,mousedOverSuggestion:e.props.mousedOverSuggestionIDs&&(n[s.id]||[]).find(function(t){return t.event_id===e.props.mousedOverSuggestionIDs.event_id&&t.google_place_id===e.props.mousedOverSuggestionIDs.google_place_id}),removeEvent:e.props.removeEvent})}))}}]),t}(s.Component),U=(n(119),function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return null===this.props.loggedInAs?a.a.createElement("div",{className:"login-area"},a.a.createElement("form",null,a.a.createElement("input",{type:"text",placeholder:"Username",value:this.props.loginUsername,onChange:this.props.loginUsernameChanged}),a.a.createElement("input",{type:"password",placeholder:"Password",value:this.props.loginPassword,onChange:this.props.loginPasswordChanged}),a.a.createElement("div",null,a.a.createElement("button",{onClick:this.props.loginButtonPressed},"Login"))),a.a.createElement("form",null,a.a.createElement("input",{type:"text",placeholder:"Username",value:this.props.newUsername,onChange:this.props.newUsernameChanged}),a.a.createElement("input",{type:"password",placeholder:"Password",value:this.props.newPassword,onChange:this.props.newPasswordChanged}),a.a.createElement("div",null,a.a.createElement("button",{onClick:this.props.createNewUser},"Sign Up")))):a.a.createElement("div",{className:"login-area"},a.a.createElement("div",{className:"logged-in-text"},"Logged in as ",this.props.loggedInAs),a.a.createElement("div",null,a.a.createElement("button",{onClick:this.props.logoutButtonPressed},"Logout")))}}]),t}(s.Component)),O=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"wrapper"},a.a.createElement("div",{className:"main-view"},a.a.createElement("div",{className:"login-and-events-wrapper"},a.a.createElement("div",{className:"login-wrapper"},a.a.createElement(U,{loginUsername:this.props.loginUsername,loginPassword:this.props.loginPassword,loginUsernameChanged:this.props.loginUsernameChanged,loginPasswordChanged:this.props.loginPasswordChanged,loginButtonPressed:this.props.loginButtonPressed,newUsername:this.props.newUsername,newPassword:this.props.newPassword,newUsernameChanged:this.props.newUsernameChanged,newPasswordChanged:this.props.newPasswordChanged,createNewUser:this.props.createNewUser,loggedInAs:this.props.loggedInAs?this.props.loggedInAs.name:null,logoutButtonPressed:this.props.logoutButtonPressed})),a.a.createElement("div",{className:"events-list-wrapper"},a.a.createElement("h2",null,"Events!"),null!==this.props.loggedInAs?a.a.createElement(v,{newEventName:this.props.newEventName,newEventDate:this.props.newEventDate,newEventNameChanged:this.props.newEventNameChanged,createNewEvent:this.props.createNewEvent,newEventDateChanged:this.props.newEventDateChanged}):null,a.a.createElement(b,{events:this.props.events,invitableUsers:this.props.invitableUsers,invitingUserText:this.props.invitingUserText,invitingUserTextChanged:this.props.invitingUserTextChanged,inviteUser:this.props.inviteUser,invites:this.props.invites,loggedInAs:this.props.loggedInAs,acceptInvitation:this.props.acceptInvitation,placeSearchText:this.props.placeSearchText,placeSearchTextChanged:this.props.placeSearchTextChanged,placeSearchAutocompletes:this.props.placeSearchAutocompletes,suggestPlace:this.props.suggestPlace,placeSuggestions:this.props.placeSuggestions,placeClickedOn:this.props.placeClickedOn,placeMousedOver:this.props.placeMousedOver,mousedOverSuggestionIDs:this.props.mousedOverSuggestionIDs,removeEvent:this.props.removeEvent})))))}}]),t}(s.Component),I=function(e){function t(){var e,s;Object(r.a)(this,t);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(s=Object(c.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).state={events:[],newEventName:"",newEventDate:Object(w.today)(),loginUsername:"",loginPassword:"",newUsername:"",newPassword:"",loggedInAs:null,invitableUsers:[],invitingUserText:"",invites:[],placeSearchText:"",placeSearchAutocompletes:[],placeSuggestions:[],mousedOverSuggestionID:null},s.componentDidMount=function(){s.setupSocket()},s.setupSocket=function(){var e=n(121)();s.socket=e,e.on("initialData",s.setInitialData),e.on("eventList",s.updateEventList),e.on("invitableUsersList",s.updateInvitableUsersList),e.on("loggedIn",s.loginSuccess),e.on("invitesList",s.updateInvitesList),e.on("placeNameMatches",s.setPlaceSearchAutocompletes),e.on("placeSuggestions",s.updatePlaceSuggestions)},s.createNewEvent=function(){s.socket.emit("createNewEvent",{token:s.state.loggedInAs.token,name:s.state.newEventName,user_id:s.state.loggedInAs.id,date:s.state.newEventDate.getTime()}),s.setState({newEventName:"",newEventDate:Object(w.today)()})},s.newEventNameChanged=function(e){s.setState({newEventName:e.target.value})},s.newEventDateChanged=function(e){s.setState({newEventDate:e})},s.updateEventList=function(e){console.log("updating event list"),s.setState({events:e})},s.updateInvitableUsersList=function(e){s.setState({invitableUsers:e})},s.updateInvitesList=function(e){s.setState({invites:e})},s.invitingUserTextChanged=function(e){s.setState({invitingUserText:e})},s.updatePlaceSuggestions=function(e){s.setState({placeSuggestions:e})},s.inviteUser=function(e,t){s.socket.emit("inviteUserToEvent",{token:s.state.loggedInAs.token,user_id:s.state.loggedInAs.id,invitee_user_id:e,event_id:t}),s.setState({invitingUserText:""})},s.setInitialData=function(e){var t=e.events,n=e.users,a=e.invites,i=e.placeSuggestions;s.setState({events:t,invitableUsers:n,invites:a,placeSuggestions:i})},s.loginUsernameChanged=function(e){s.setState({loginUsername:e.target.value})},s.loginPasswordChanged=function(e){s.setState({loginPassword:e.target.value})},s.loginButtonPressed=function(e){e.preventDefault(),s.socket.emit("login",{username:s.state.loginUsername,password:s.state.loginPassword}),s.setState({newUsername:"",newPassword:"",loginUsername:"",loginPassword:""})},s.newUsernameChanged=function(e){s.setState({newUsername:e.target.value})},s.newPasswordChanged=function(e){s.setState({newPassword:e.target.value})},s.createNewUser=function(e){e.preventDefault(),s.socket.emit("signUp",{username:s.state.newUsername,password:s.state.newPassword}),s.setState({newUsername:"",newPassword:"",loginUsername:"",loginPassword:""})},s.loginSuccess=function(e){var t=e.user;s.setState({loggedInAs:t})},s.logoutButtonPressed=function(){s.setState({loggedInAs:null})},s.acceptInvitation=function(e){s.socket.emit("acceptInvitation",{token:s.state.loggedInAs.token,user_id:s.state.loggedInAs.id,event_id:e})},s.placeSearchTextChanged=function(e){null!==s.autoCompleteBuildupTimer&&(clearTimeout(s.autoCompleteBuildupTimer),s.autoCompleteBuildupTimer=null),""!==e?s.autoCompleteBuildupTimer=setTimeout(function(){s.socket.emit("placeTextEntered",{token:s.state.loggedInAs.token,user_id:s.state.loggedInAs.id,text:e}),s.autoCompleteBuildupTimer=null},250):s.setState({placeSearchAutocompletes:[]}),s.setState({placeSearchText:e})},s.setPlaceSearchAutocompletes=function(e){s.setState({placeSearchAutocompletes:e})},s.suggestPlace=function(e,t,n){s.socket.emit("suggestPlace",{token:s.state.loggedInAs.token,user_id:s.state.loggedInAs.id,place_id:e,place_name:t,event_id:n}),s.setState({placeSearchText:""})},s.placeClickedOn=function(e,t,n){s.socket.emit("voteForPlace",{token:s.state.loggedInAs.token,user_id:s.state.loggedInAs.id,place_id:e,event_id:t,setVoteTo:!n})},s.placeMousedOver=function(e){s.setState({mousedOverSuggestionIDs:e})},s.removeEvent=function(e){s.socket.emit("removeEvent",{token:s.state.loggedInAs.token,user_id:s.state.loggedInAs.id,event_id:e})},s}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement(O,{events:this.state.events,newEventName:this.state.newEventName,newEventDate:this.state.newEventDate,createNewEvent:this.createNewEvent,newEventNameChanged:this.newEventNameChanged,newEventDateChanged:this.newEventDateChanged,loginUsername:this.state.loginUsername,loginPassword:this.state.loginPassword,loginUsernameChanged:this.loginUsernameChanged,loginPasswordChanged:this.loginPasswordChanged,loginButtonPressed:this.loginButtonPressed,newUsername:this.state.newUsername,newPassword:this.state.newPassword,newUsernameChanged:this.newUsernameChanged,newPasswordChanged:this.newPasswordChanged,createNewUser:this.createNewUser,loggedInAs:this.state.loggedInAs,logoutButtonPressed:this.logoutButtonPressed,invitableUsers:this.state.invitableUsers,invitingUserText:this.state.invitingUserText,invitingUserTextChanged:this.invitingUserTextChanged,inviteUser:this.inviteUser,invites:this.state.invites,acceptInvitation:this.acceptInvitation,placeSearchText:this.state.placeSearchText,placeSearchTextChanged:this.placeSearchTextChanged,placeSearchAutocompletes:this.state.placeSearchAutocompletes,suggestPlace:this.suggestPlace,placeSuggestions:this.state.placeSuggestions,placeClickedOn:this.placeClickedOn,placeMousedOver:this.placeMousedOver,mousedOverSuggestionIDs:this.state.mousedOverSuggestionIDs,removeEvent:this.removeEvent})}}]),t}(s.Component),N=function(e){function t(){return Object(r.a)(this,t),Object(c.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement(I,null))}}]),t}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},62:function(e,t,n){e.exports=n(150)},67:function(e,t,n){},69:function(e,t,n){}},[[62,2,1]]]);
//# sourceMappingURL=main.ff00038e.chunk.js.map