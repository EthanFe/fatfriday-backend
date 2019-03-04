(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t){e.exports={today:function(){var e=new Date;return e.setHours(0),e.setMinutes(0),e.setSeconds(0),e},index:function(e,t){return e.reduce(function(e,n){return e[n[t]]=n,e},new Object)},group:function(e,t){return e.reduce(function(e,n){return e[n[t]]=e[n[t]]||new Array,e[n[t]].push(n),e},new Object)}}},119:function(e,t,n){},147:function(e,t){},150:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),i=n(16),o=n.n(i),r=(n(67),n(3)),c=n(4),l=n(6),p=n(5),u=n(7),d=(n(69),n(60)),g=n.n(d),v=function(e){function t(){return Object(r.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("div",null,s.a.createElement("input",{type:"text",placeholder:"Event Name",value:this.props.newEventName,onChange:this.props.newEventNameChanged}),s.a.createElement(g.a,{onChange:this.props.newEventDateChanged,value:this.props.newEventDate})),s.a.createElement("button",{onClick:this.props.createNewEvent},"Create New Event"))}}]),t}(a.Component),m=n(40),h=n.n(m),w=n(10),f=n(41),E=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).componentDidMount=function(){n.positiveAnimation=Object(f.a)({targets:".vote-count."+n.props.id,color:"#ffffff",easing:"easeOutQuart",direction:"alternate",duration:350,background:"#00B258"}),n.negativeAnimation=Object(f.a)({targets:".vote-count."+n.props.id,color:"#ffffff",easing:"easeOutQuart",direction:"alternate",duration:350,background:"#B30300"})},n.componentDidUpdate=function(e){e.votes<n.props.votes?n.positiveAnimation.restart():e.votes>n.props.votes&&n.negativeAnimation.restart()},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"vote-count "+this.props.id},this.props.votes)}}]),t}(a.Component),S=n(61),C=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).dropDownStyle={borderRadius:"3px",boxShadow:"0 2px 12px rgba(0, 0, 0, 0.1)",background:"rgba(255, 255, 255, 0.9)",padding:"2px 0",fontSize:"90%",position:"fixed",overflow:"auto",maxHeight:"50%","z-index":"1"},n.doesNameContainInput=function(e,t){return-1!==e.toLowerCase().indexOf(t.toLowerCase())},n.viewingAsMember=function(e){return n.props.loggedInAs&&void 0!==e.find(function(e){return e.id===n.props.loggedInAs.id})},n.votedFor=function(e){return n.props.loggedInAs&&void 0!==e.votes.find(function(e){return e.user_id===n.props.loggedInAs.id})},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=Object(w.index)(this.props.invitableUsers,"id"),n=this.props.invites.filter(function(e){return e.accepted});n.push({user_id:this.props.data.created_by}),n=n.map(function(e){return t[e.user_id]});var a=this.props.invites.filter(function(e){return!e.accepted}).map(function(e){return t[e.user_id]}),i=this.viewingAsMember(n),o=this.props.placeSuggestions.sort(function(e,t){return t.votes.length-e.votes.length}),r=this.props.invitableUsers.filter(function(t){return!e.props.loggedInAs||t.id!==e.props.loggedInAs.id}),c=this.props.mousedOverSuggestion&&this.props.mousedOverSuggestion.votes.map(function(e){return e.user_id})||[];return s.a.createElement("div",{className:"event-display"},s.a.createElement("div",{className:"event-display-main"},s.a.createElement("div",{className:"event-display-members"},s.a.createElement("div",{className:"invited-users-list"},s.a.createElement("div",null,"Users going:"),n.map(function(e){return s.a.createElement("div",{key:e.id,className:c.includes(e.id)?"voted-user":""},e.name)}))),s.a.createElement("div",{className:"event-display-title"},s.a.createElement("span",{className:"event-name"},this.props.data.name),s.a.createElement("span",{className:"event-date"},new Date(this.props.data.event_date).toLocaleString()),this.props.eventOwned?s.a.createElement("div",{className:"invite-user-field"},s.a.createElement("div",{className:"invite-user-label"},"Invite to Event"),s.a.createElement(h.a,{getItemValue:function(e){return e.name},items:r,renderItem:function(t,n){return s.a.createElement("div",{style:{background:n?"lightgray":"white",color:void 0!==e.props.invites.find(function(e){return e.user_id===t.id})?"#67960f80":"black"}},t.name)},value:this.props.invitingUserText,onChange:function(t){return e.props.invitingUserTextChanged(t.target.value)},onSelect:function(t,n){return e.props.inviteUser(n.id,e.props.data.id)},shouldItemRender:function(t,n){return e.doesNameContainInput(t.name,n)},menuStyle:this.dropDownStyle})):null),s.a.createElement("div",{className:"event-display-members"},s.a.createElement("div",{className:"invited-users-list"},s.a.createElement("div",null,"Users already invited:"),a.map(function(e){return s.a.createElement("div",{key:e.id},e.name)})),this.props.loggedInAs&&void 0!==a.find(function(t){return t.id===e.props.loggedInAs.id})?s.a.createElement("div",{className:"join-event"},s.a.createElement("button",{className:"join-event-button",onClick:function(){return e.props.acceptInvitation(e.props.data.id)}},"Join Event")):null)),i?s.a.createElement("div",{className:"event-display-place-suggestion"},s.a.createElement("div",{className:"invite-user-label"},"Suggest a Place"),s.a.createElement(h.a,{getItemValue:function(e){return e.placeName},items:this.props.placeSearchAutocompletes,renderItem:function(e,t){return s.a.createElement("div",{style:{background:t?"lightgray":"white"}},e.placeName)},value:this.props.placeSearchText,onChange:function(t){return e.props.placeSearchTextChanged(t.target.value)},onSelect:function(t,n){return e.props.suggestPlace(n.placeID,n.placeName,e.props.data.id)},shouldItemRender:function(t,n){return e.doesNameContainInput(t.placeName,n)},menuStyle:this.dropDownStyle})):null,s.a.createElement("div",{className:"event-display-place-list"},s.a.createElement(S.a,null,o.map(function(t){var n=e.votedFor(t),a="event-display-place-list-entry"+(n?" voted-for":""),o="".concat(t.google_place_id).concat(e.props.data.id);return s.a.createElement("div",{className:"event-display-place-list-entry-container",key:o,onMouseOver:function(){return e.props.placeMousedOver({event_id:e.props.data.id,google_place_id:t.google_place_id})},onMouseOut:function(){return e.props.placeMousedOver(null)}},s.a.createElement(E,{votes:t.votes.length,id:o}),i?s.a.createElement("div",{className:"".concat(a," clickable"),onClick:function(){return e.props.placeClickedOn(t.google_place_id,e.props.data.id,n)}},t.name):s.a.createElement("div",{className:"".concat(a)},t.name))}))))}}]),t}(a.Component),b=function(e){function t(){return Object(r.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=Object(w.group)(this.props.invites,"event_id"),n=Object(w.group)(this.props.placeSuggestions,"event_id"),a=this.props.events.sort(function(e,t){return new Date(e.event_date).getTime()-new Date(t.event_date).getTime()});return s.a.createElement("div",{className:"events-list"},a.map(function(a){return s.a.createElement(C,{data:a,key:a.id,invitableUsers:e.props.invitableUsers,invitingUserText:e.props.invitingUserText,invitingUserTextChanged:e.props.invitingUserTextChanged,inviteUser:e.props.inviteUser,invites:t[a.id]||[],loggedInAs:e.props.loggedInAs,eventOwned:e.props.loggedInAs&&e.props.loggedInAs.id===a.created_by,acceptInvitation:e.props.acceptInvitation,placeSearchText:e.props.placeSearchText,placeSearchTextChanged:e.props.placeSearchTextChanged,placeSearchAutocompletes:e.props.placeSearchAutocompletes,suggestPlace:e.props.suggestPlace,placeSuggestions:n[a.id]||[],placeClickedOn:e.props.placeClickedOn,placeMousedOver:e.props.placeMousedOver,mousedOverSuggestion:e.props.mousedOverSuggestionIDs&&(n[a.id]||[]).find(function(t){return t.event_id===e.props.mousedOverSuggestionIDs.event_id&&t.google_place_id===e.props.mousedOverSuggestionIDs.google_place_id})})}))}}]),t}(a.Component),U=(n(119),function(e){function t(){return Object(r.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return null===this.props.loggedInAs?s.a.createElement("div",{className:"login-area"},s.a.createElement("form",null,s.a.createElement("input",{type:"text",placeholder:"Username",value:this.props.loginUsername,onChange:this.props.loginUsernameChanged}),s.a.createElement("input",{type:"password",placeholder:"Password",value:this.props.loginPassword,onChange:this.props.loginPasswordChanged}),s.a.createElement("div",null,s.a.createElement("button",{onClick:this.props.loginButtonPressed},"Login"))),s.a.createElement("form",null,s.a.createElement("input",{type:"text",placeholder:"Username",value:this.props.newUsername,onChange:this.props.newUsernameChanged}),s.a.createElement("input",{type:"password",placeholder:"Password",value:this.props.newPassword,onChange:this.props.newPasswordChanged}),s.a.createElement("div",null,s.a.createElement("button",{onClick:this.props.createNewUser},"Sign Up")))):s.a.createElement("div",{className:"login-area"},s.a.createElement("div",{className:"logged-in-text"},"Logged in as ",this.props.loggedInAs),s.a.createElement("div",null,s.a.createElement("button",{onClick:this.props.logoutButtonPressed},"Logout")))}}]),t}(a.Component)),O=function(e){function t(){return Object(r.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"wrapper"},s.a.createElement("div",{className:"main-view"},s.a.createElement("div",{className:"login-and-events-wrapper"},s.a.createElement("div",{className:"login-wrapper"},s.a.createElement(U,{loginUsername:this.props.loginUsername,loginPassword:this.props.loginPassword,loginUsernameChanged:this.props.loginUsernameChanged,loginPasswordChanged:this.props.loginPasswordChanged,loginButtonPressed:this.props.loginButtonPressed,newUsername:this.props.newUsername,newPassword:this.props.newPassword,newUsernameChanged:this.props.newUsernameChanged,newPasswordChanged:this.props.newPasswordChanged,createNewUser:this.props.createNewUser,loggedInAs:this.props.loggedInAs?this.props.loggedInAs.name:null,logoutButtonPressed:this.props.logoutButtonPressed})),s.a.createElement("div",{className:"events-list-wrapper"},s.a.createElement("h2",null,"Events!"),null!==this.props.loggedInAs?s.a.createElement(v,{newEventName:this.props.newEventName,newEventDate:this.props.newEventDate,newEventNameChanged:this.props.newEventNameChanged,createNewEvent:this.props.createNewEvent,newEventDateChanged:this.props.newEventDateChanged}):null,s.a.createElement(b,{events:this.props.events,invitableUsers:this.props.invitableUsers,invitingUserText:this.props.invitingUserText,invitingUserTextChanged:this.props.invitingUserTextChanged,inviteUser:this.props.inviteUser,invites:this.props.invites,loggedInAs:this.props.loggedInAs,acceptInvitation:this.props.acceptInvitation,placeSearchText:this.props.placeSearchText,placeSearchTextChanged:this.props.placeSearchTextChanged,placeSearchAutocompletes:this.props.placeSearchAutocompletes,suggestPlace:this.props.suggestPlace,placeSuggestions:this.props.placeSuggestions,placeClickedOn:this.props.placeClickedOn,placeMousedOver:this.props.placeMousedOver,mousedOverSuggestionIDs:this.props.mousedOverSuggestionIDs})))))}}]),t}(a.Component),I=function(e){function t(){var e,a;Object(r.a)(this,t);for(var s=arguments.length,i=new Array(s),o=0;o<s;o++)i[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).state={events:[],newEventName:"",newEventDate:Object(w.today)(),loginUsername:"",loginPassword:"",newUsername:"",newPassword:"",loggedInAs:null,invitableUsers:[],invitingUserText:"",invites:[],placeSearchText:"",placeSearchAutocompletes:[],placeSuggestions:[],mousedOverSuggestionID:null},a.componentDidMount=function(){a.setupSocket()},a.setupSocket=function(){var e=n(121)();a.socket=e,e.on("initialData",a.setInitialData),e.on("eventList",a.updateEventList),e.on("invitableUsersList",a.updateInvitableUsersList),e.on("loggedIn",a.loginSuccess),e.on("invitesList",a.updateInvitesList),e.on("placeNameMatches",a.setPlaceSearchAutocompletes),e.on("placeSuggestions",a.updatePlaceSuggestions)},a.createNewEvent=function(){a.socket.emit("createNewEvent",{token:a.state.loggedInAs.token,name:a.state.newEventName,user_id:a.state.loggedInAs.id,date:a.state.newEventDate.getTime()}),a.setState({newEventName:"",newEventDate:Object(w.today)()})},a.newEventNameChanged=function(e){a.setState({newEventName:e.target.value})},a.newEventDateChanged=function(e){a.setState({newEventDate:e})},a.updateEventList=function(e){a.setState({events:e})},a.updateInvitableUsersList=function(e){a.setState({invitableUsers:e})},a.updateInvitesList=function(e){a.setState({invites:e})},a.invitingUserTextChanged=function(e){a.setState({invitingUserText:e})},a.updatePlaceSuggestions=function(e){a.setState({placeSuggestions:e})},a.inviteUser=function(e,t){a.socket.emit("inviteUserToEvent",{token:a.state.loggedInAs.token,user_id:a.state.loggedInAs.id,invitee_user_id:e,event_id:t}),a.setState({invitingUserText:""})},a.setInitialData=function(e){var t=e.events,n=e.users,s=e.invites,i=e.placeSuggestions;a.setState({events:t,invitableUsers:n,invites:s,placeSuggestions:i})},a.loginUsernameChanged=function(e){a.setState({loginUsername:e.target.value})},a.loginPasswordChanged=function(e){a.setState({loginPassword:e.target.value})},a.loginButtonPressed=function(e){e.preventDefault(),a.socket.emit("login",{username:a.state.loginUsername,password:a.state.loginPassword}),a.setState({newUsername:"",newPassword:"",loginUsername:"",loginPassword:""})},a.newUsernameChanged=function(e){a.setState({newUsername:e.target.value})},a.newPasswordChanged=function(e){a.setState({newPassword:e.target.value})},a.createNewUser=function(e){e.preventDefault(),a.socket.emit("signUp",{username:a.state.newUsername,password:a.state.newPassword}),a.setState({newUsername:"",newPassword:"",loginUsername:"",loginPassword:""})},a.loginSuccess=function(e){var t=e.user;a.setState({loggedInAs:t})},a.logoutButtonPressed=function(){a.setState({loggedInAs:null})},a.acceptInvitation=function(e){a.socket.emit("acceptInvitation",{token:a.state.loggedInAs.token,user_id:a.state.loggedInAs.id,event_id:e})},a.placeSearchTextChanged=function(e){null!==a.autoCompleteBuildupTimer&&(clearTimeout(a.autoCompleteBuildupTimer),a.autoCompleteBuildupTimer=null),""!==e?a.autoCompleteBuildupTimer=setTimeout(function(){a.socket.emit("placeTextEntered",{token:a.state.loggedInAs.token,user_id:a.state.loggedInAs.id,text:e}),a.autoCompleteBuildupTimer=null},250):a.setState({placeSearchAutocompletes:[]}),a.setState({placeSearchText:e})},a.setPlaceSearchAutocompletes=function(e){a.setState({placeSearchAutocompletes:e})},a.suggestPlace=function(e,t,n){a.socket.emit("suggestPlace",{token:a.state.loggedInAs.token,user_id:a.state.loggedInAs.id,place_id:e,place_name:t,event_id:n}),a.setState({placeSearchText:""})},a.placeClickedOn=function(e,t,n){a.socket.emit("voteForPlace",{token:a.state.loggedInAs.token,user_id:a.state.loggedInAs.id,place_id:e,event_id:t,setVoteTo:!n})},a.placeMousedOver=function(e){a.setState({mousedOverSuggestionIDs:e})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement(O,{events:this.state.events,newEventName:this.state.newEventName,newEventDate:this.state.newEventDate,createNewEvent:this.createNewEvent,newEventNameChanged:this.newEventNameChanged,newEventDateChanged:this.newEventDateChanged,loginUsername:this.state.loginUsername,loginPassword:this.state.loginPassword,loginUsernameChanged:this.loginUsernameChanged,loginPasswordChanged:this.loginPasswordChanged,loginButtonPressed:this.loginButtonPressed,newUsername:this.state.newUsername,newPassword:this.state.newPassword,newUsernameChanged:this.newUsernameChanged,newPasswordChanged:this.newPasswordChanged,createNewUser:this.createNewUser,loggedInAs:this.state.loggedInAs,logoutButtonPressed:this.logoutButtonPressed,invitableUsers:this.state.invitableUsers,invitingUserText:this.state.invitingUserText,invitingUserTextChanged:this.invitingUserTextChanged,inviteUser:this.inviteUser,invites:this.state.invites,acceptInvitation:this.acceptInvitation,placeSearchText:this.state.placeSearchText,placeSearchTextChanged:this.placeSearchTextChanged,placeSearchAutocompletes:this.state.placeSearchAutocompletes,suggestPlace:this.suggestPlace,placeSuggestions:this.state.placeSuggestions,placeClickedOn:this.placeClickedOn,placeMousedOver:this.placeMousedOver,mousedOverSuggestionIDs:this.state.mousedOverSuggestionIDs})}}]),t}(a.Component),N=function(e){function t(){return Object(r.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(I,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},62:function(e,t,n){e.exports=n(150)},67:function(e,t,n){},69:function(e,t,n){}},[[62,2,1]]]);
//# sourceMappingURL=main.67b0535f.chunk.js.map