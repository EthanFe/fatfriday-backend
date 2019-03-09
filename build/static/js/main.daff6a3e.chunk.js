(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t){e.exports={today:function(){var e=new Date;return e.setHours(0),e.setMinutes(0),e.setSeconds(0),e},index:function(e,t){return e.reduce(function(e,n){return e[n[t]]=n,e},new Object)},group:function(e,t){return e.reduce(function(e,n){return e[n[t]]=e[n[t]]||new Array,e[n[t]].push(n),e},new Object)}}},156:function(e,t,n){},183:function(e,t){},186:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(12),i=n.n(r),o=(n(83),n(2)),c=n(3),l=n(5),u=n(4),p=n(6),g=(n(85),n(73)),d=n.n(g),m=n(7),v="general:socketEmit",h="loginUI:changeLoginUsername",f="loginUI:changeLoginPassword",y="loginUI:clearLoginFields",E="auth:loggedOut",b="eventUI:changeNewEventName",O="eventUI:changeNewEventDate",I="eventUI:newEventCreated",w="inviteUI:changeInvitingUserText",j="inviteUI:clearInvitingUserText",A="suggestUI:changePlaceSearchText",N="suggestUI:clearPlaceSearchText",k="suggestUI:clearPlaceSearchAutocompletes",C="voteUI:mouseOverPlace",_="mainUI:clickOnEvent",M="messageUI:changeCurrentlyTypingMessage",U="messageUI:clearCurrentlyTypingMessage",S="messageUI:changeCurrentlyEditingMessage",x="messageUI:changeCurrentlyEditingMessageContent",T="messageUI:clearCurrentlyEditingMessage";function D(e,t){return{type:v,payload:{eventType:e,socketPayload:t}}}var P=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).createNewEvent=function(){n.props.createNewEvent(n.props.loggedInAs.token,n.props.loggedInAs.id,n.props.newEventName,n.props.newEventDate.getTime())},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"new-event-input"},s.a.createElement("div",null,s.a.createElement("input",{type:"text",placeholder:"Event Name",value:this.props.newEventName,onChange:function(t){return e.props.changeNewEventName(t.target.value)}}),s.a.createElement(d.a,{value:this.props.newEventDate,onChange:this.props.changeNewEventDate})),s.a.createElement("button",{onClick:this.createNewEvent},"Create New Event"))}}]),t}(a.Component),L={changeNewEventName:function(e){return{type:b,payload:{name:e}}},changeNewEventDate:function(e){return{type:O,payload:{date:e}}},createNewEvent:function(e,t,n,a){return Ue.dispatch({type:I}),D("createNewEvent",{token:e,name:n,user_id:t,date:a})}},B=Object(m.b)(function(e,t){return{loggedInAs:e.loggedInAs,newEventName:e.newEventName,newEventDate:e.newEventDate}},L)(P),R=n(11),z=n(21),H=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).editMessage=function(){n.props.editMessage(n.props.loggedInAs.token,n.props.loggedInAs.id,n.props.message.id,n.props.currentlyEditingMessageContent)},n.deleteMessage=function(){n.props.sendMessage(n.props.loggedInAs.token,n.props.loggedInAs.id,n.props.message.id)},n.viewingAsMessageAuthor=function(){return n.props.loggedInAs&&n.props.loggedInAs.id===n.props.message.user_id},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"event-display-messages-message-container",key:this.props.message.id},s.a.createElement("div",{className:"event-display-messages-message-upper"},this.viewingAsMessageAuthor()&&!this.props.editing?s.a.createElement("div",{className:"event-display-messages-message-editdelete-buttons"},s.a.createElement("div",{className:"event-display-messages-message-edit-button",onClick:function(){return e.props.changeCurrentlyEditingMessage(e.props.message.id,e.props.message.message_body)}},"Edit"),s.a.createElement("div",{className:"event-display-messages-message-delete-button",onClick:function(){return e.props.deleteMessage(e.props.message.id)}},"Delete")):null,s.a.createElement("div",{className:"event-display-messages-message-timestamps"},s.a.createElement("div",{className:"event-display-messages-message-timestamp basic-timestamp"},new Date(this.props.message.created_on).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})),s.a.createElement("div",{className:"event-display-messages-message-timestamp full-timestamp"},new Date(this.props.message.created_on).toLocaleString()))),this.props.editing?s.a.createElement("div",null,s.a.createElement("input",{type:"text",placeholder:"Message",value:this.props.currentlyEditingMessageContent,onChange:function(t){return e.props.changeCurrentlyEditingMessageContent(t.target.value)}}),s.a.createElement("span",null,s.a.createElement("button",{onClick:this.editMessage},"Edit"))):s.a.createElement("div",{className:"event-display-messages-message"},s.a.createElement("div",{className:"event-display-messages-message-username"},this.props.username,": "),s.a.createElement("div",{className:"event-display-messages-message-text"},this.props.message.message_body)))}}]),t}(a.PureComponent),F={changeCurrentlyEditingMessage:function(e,t){return{type:S,payload:{message_id:e,existingMessage:t}}},changeCurrentlyEditingMessageContent:function(e){return{type:x,payload:{text:e}}},editMessage:function(e,t,n,a){return Ue.dispatch({type:T}),D("editMessage",{token:e,user_id:t,message_id:n,new_message:a})},deleteMessage:function(e,t,n){return D("deleteMessage",{token:e,user_id:t,message_id:n})}},J=Object(m.b)(function(e,t){return{loggedInAs:e.loggedInAs,editing:e.currentlyEditingMessage===t.message.id,currentlyEditingMessageContent:e.currentlyEditingMessageContent}},F)(H),Q=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).sendMessage=function(e){e.preventDefault(),n.props.sendMessage(n.props.loggedInAs.token,n.props.loggedInAs.id,n.props.eventID,n.props.currentlyTypingMessage)},n.scrollToBottom=function(){var e=n.refs.messageList,t=e.scrollHeight-e.clientHeight;Object(z.a)({targets:".event-display-messages-list.event-id-"+n.props.eventID,easing:"easeOutQuart",direction:"normal",duration:350,autoplay:!1,scrollTop:t>0?t:0}).restart()},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(e){e.messages.length!==this.props.messages.length&&this.scrollToBottom()}},{key:"componentDidMount",value:function(){this.scrollToBottom()}},{key:"render",value:function(){var e=this,t=this.props.messages.sort(function(e,t){return new Date(e.created_on).getTime()-new Date(t.created_on).getTime()});return s.a.createElement("div",{className:"event-display-messages"},s.a.createElement("div",{className:"event-display-messages-header"},"Chat"),s.a.createElement("div",{className:"event-display-messages-list event-id-"+this.props.eventID,ref:"messageList"},t.map(function(t){return s.a.createElement(J,{message:t,username:e.props.users[t.user_id].name,key:t.id})})),this.props.active&&this.props.viewingAsMember?s.a.createElement("div",{className:"event-display-messages-text-entry"},s.a.createElement("form",null,s.a.createElement("input",{type:"text",placeholder:"Message",value:this.props.currentlyTypingMessage,onChange:function(t){return e.props.changeCurrentlyTypingMessage(t.target.value)}}),s.a.createElement("div",null,s.a.createElement("button",{onClick:this.sendMessage},"Send")))):null)}}]),t}(a.Component),V={changeCurrentlyTypingMessage:function(e){return{type:M,payload:{text:e}}},sendMessage:function(e,t,n,a){return Ue.dispatch({type:U}),D("sendMessage",{token:e,user_id:t,event_id:n,message:a})}},Z=Object(m.b)(function(e,t){return{loggedInAs:e.loggedInAs,currentlyTypingMessage:e.currentlyTypingMessage}},V)(Q),$=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).componentDidMount=function(){n.positiveAnimation=Object(z.a)({targets:".vote-count."+n.props.id,color:"#ffffff",easing:"easeOutQuart",direction:"alternate",duration:350,background:"#00B258"}),n.negativeAnimation=Object(z.a)({targets:".vote-count."+n.props.id,color:"#ffffff",easing:"easeOutQuart",direction:"alternate",duration:350,background:"#B30300"})},n.componentDidUpdate=function(e){e.votes<n.props.votes?n.positiveAnimation.restart():e.votes>n.props.votes&&n.negativeAnimation.restart()},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"vote-count "+this.props.id},this.props.votes)}}]),t}(a.Component),q=n(76),K=n(75),W=n.n(K),Y=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"place-map-marker"+(this.props.$hover?" map-marker-hovered":"")},this.props.$hover?this.props.place.placeData.name:null)}}]),t}(a.Component),G=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).votedFor=function(e){return n.props.loggedInAs&&void 0!==e.votes.find(function(e){return e.user_id===n.props.loggedInAs.id})},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.placeSuggestions.sort(function(e,t){return t.votes.length-e.votes.length});return s.a.createElement("div",null,s.a.createElement("div",{className:"event-display-place-list"},s.a.createElement(q.a,null,t.map(function(t){var n=e.votedFor(t),a="event-display-place-list-entry"+(n?" voted-for":""),r="".concat(t.google_place_id).concat(e.props.eventID);return s.a.createElement("div",{className:"event-display-place-list-entry-container",key:r,onMouseOver:function(){return e.props.mouseOverPlace({event_id:e.props.eventID,google_place_id:t.google_place_id})},onMouseOut:function(){return e.props.mouseOverPlace(null)}},s.a.createElement($,{votes:t.votes.length,id:r}),e.props.viewingAsMember?s.a.createElement("div",{className:"".concat(a," clickable"),onClick:function(){return e.props.clickOnPlace(e.props.loggedInAs.token,e.props.loggedInAs.id,t.google_place_id,e.props.eventID,n)}},t.placeData.name):s.a.createElement("div",{className:"".concat(a)},t.placeData.name))}))),s.a.createElement("div",{className:"map-wrapper",style:{height:"300px",width:"300px"}},s.a.createElement(W.a,{bootstrapURLKeys:{key:"AIzaSyBEONR_56KptR1reP3-Jcw9pCZTMeZfupY"},defaultCenter:{lat:29.747055,lng:-95.372617},defaultZoom:11},this.props.placeSuggestions.map(function(e){return s.a.createElement(Y,{lat:e.placeData.location.latitude,lng:e.placeData.location.longitude,place:e,key:e.google_place_id})}))))}}]),t}(a.Component),X={mouseOverPlace:function(e){return{type:C,payload:{idObject:e}}},clickOnPlace:function(e,t,n,a,s){return D("voteForPlace",{token:e,user_id:t,place_id:n,event_id:a,setVoteTo:!s})}},ee=Object(m.b)(function(e,t){return{loggedInAs:e.loggedInAs}},X)(G),te=n(30),ne=n.n(te),ae={borderRadius:"3px",boxShadow:"0 2px 12px rgba(0, 0, 0, 0.1)",background:"rgba(255, 255, 255, 0.9)",padding:"2px 0",fontSize:"90%",position:"fixed",overflow:"auto",maxHeight:"50%","z-index":"1"},se=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).doesNameContainInput=function(e,t){return-1!==e.toLowerCase().indexOf(t.toLowerCase())},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"invite-user-field"},s.a.createElement("div",{className:"invite-user-label"},"Invite to Event"),s.a.createElement(ne.a,{getItemValue:function(e){return e.name},items:this.props.invitableUsers,renderItem:function(t,n){return s.a.createElement("div",{style:{background:n?"lightgray":"white",color:void 0!==e.props.invites.find(function(e){return e.user_id===t.id})?"#67960f80":"black"}},t.name)},value:this.props.invitingUserText,onChange:function(t){return e.props.changeInvitingUserText(t.target.value)},onSelect:function(t,n){return e.props.inviteUser(e.props.loggedInAs.token,e.props.loggedInAs.id,n.id,e.props.eventID)},shouldItemRender:function(t,n){return e.doesNameContainInput(t.name,n)},menuStyle:ae}))}}]),t}(a.Component),re={changeInvitingUserText:function(e){return{type:w,payload:{text:e}}},inviteUser:function(e,t,n,a){return Ue.dispatch({type:j}),D("inviteUserToEvent",{token:e,user_id:t,invitee_user_id:n,event_id:a})}},ie=Object(m.b)(function(e,t){return{loggedInAs:e.loggedInAs,invitingUserText:e.invitingUserText,invitableUsers:e.users.filter(function(t){return!e.loggedInAs||t.id!==e.loggedInAs.id})}},re)(se),oe=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"user-display"},s.a.createElement("span",{className:"user-display-name"+(this.props.votedOnMousedOver?" voted-user":"")},this.props.name),this.props.online?s.a.createElement("div",{className:"online-indicator"}):null)}}]),t}(a.Component),ce=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.mousedOverSuggestion&&this.props.mousedOverSuggestion.votes.map(function(e){return e.user_id})||[];return s.a.createElement("div",{className:"invited-users-list"},s.a.createElement("div",null,"Users going:"),this.props.users.map(function(n){return s.a.createElement(oe,{key:n.id,votedOnMousedOver:t.includes(n.id),name:n.name,online:e.props.onlineUsers.includes(n.id)})}))}}]),t}(a.Component),le=Object(m.b)(function(e,t){return{mousedOverSuggestion:e.mousedOverSuggestionIDPair&&t.placeSuggestions.find(function(t){return t.event_id===e.mousedOverSuggestionIDPair.event_id&&t.google_place_id===e.mousedOverSuggestionIDPair.google_place_id}),onlineUsers:e.onlineUsers}})(ce),ue=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).placeSearchTextChanged=function(e){null!==n.autoCompleteBuildupTimer&&(clearTimeout(n.autoCompleteBuildupTimer),n.autoCompleteBuildupTimer=null),""!==e?n.autoCompleteBuildupTimer=setTimeout(function(){n.props.requestPlaceAutocompletes(n.props.loggedInAs.token,n.props.loggedInAs.id,e),n.autoCompleteBuildupTimer=null},250):n.props.clearPlaceSearchAutocompletes(),n.props.changePlaceSearchText(e)},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"event-display-place-suggestion"},s.a.createElement("div",{className:"invite-user-label"},"Suggest a Place"),s.a.createElement(ne.a,{getItemValue:function(e){return e.placeName},items:this.props.placeSearchAutocompletes,renderItem:function(e,t){return s.a.createElement("div",{style:{background:t?"lightgray":"white"}},e.placeName)},value:this.props.placeSearchText,onChange:function(t){return e.placeSearchTextChanged(t.target.value)},onSelect:function(t,n){return e.props.suggestPlace(e.props.loggedInAs.token,e.props.loggedInAs.id,e.props.eventID,n.placeID,n.placeName)},shouldItemRender:function(){return!0},menuStyle:ae}))}}]),t}(a.Component),pe={changePlaceSearchText:function(e){return{type:A,payload:{text:e}}},requestPlaceAutocompletes:function(e,t,n){return D("placeTextEntered",{token:e,user_id:t,text:n})},suggestPlace:function(e,t,n,a,s){return Ue.dispatch({type:N}),D("suggestPlace",{token:e,user_id:t,place_id:a,place_name:s,event_id:n})},clearPlaceSearchAutocompletes:function(){return{type:k}}},ge=Object(m.b)(function(e,t){return{loggedInAs:e.loggedInAs,placeSearchAutocompletes:e.placeSearchAutocompletes,placeSearchText:e.placeSearchText}},pe)(ue),de=function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).dropDownStyle={borderRadius:"3px",boxShadow:"0 2px 12px rgba(0, 0, 0, 0.1)",background:"rgba(255, 255, 255, 0.9)",padding:"2px 0",fontSize:"90%",position:"fixed",overflow:"auto",maxHeight:"50%","z-index":"1"},n.viewingAsMember=function(e){return n.props.loggedInAs&&void 0!==e.find(function(e){return e.id===n.props.loggedInAs.id})},n.viewingAsCreator=function(){return n.props.loggedInAs&&n.props.loggedInAs.id===n.props.data.created_by},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=Object(R.index)(this.props.invitableUsers,"id"),n=this.props.invites.filter(function(e){return e.accepted});n.push({user_id:this.props.data.created_by}),n=n.map(function(e){return t[e.user_id]});var a=this.props.invites.filter(function(e){return!e.accepted}).map(function(e){return t[e.user_id]}),r=this.viewingAsMember(n);return s.a.createElement("div",{className:"event-display"+(this.props.active?" active-event":" inactive-event"),onClick:function(){return e.props.clickOnEvent(e.props.data.id)}},s.a.createElement("div",{className:"event-display-left-column"},s.a.createElement("div",{className:"event-display-main"},s.a.createElement("div",{className:"event-display-members"},s.a.createElement(le,{users:n,placeSuggestions:this.props.placeSuggestions})),s.a.createElement("div",{className:"event-display-title"},s.a.createElement("span",{className:"event-name"},this.props.data.name,this.viewingAsCreator()?s.a.createElement("span",{className:"delete-event-button",onClick:function(){return e.props.deleteEvent(e.props.loggedInAs.token,e.props.loggedInAs.id,e.props.data.id)}}," (Delete)"):null),s.a.createElement("span",{className:"event-date"},new Date(this.props.data.event_date).toLocaleString()),this.props.eventOwned&&this.props.active?s.a.createElement(ie,{invites:this.props.invites,eventID:this.props.data.id}):null),s.a.createElement("div",{className:"event-display-members"},s.a.createElement("div",{className:"invited-users-list"},s.a.createElement("div",null,"Users already invited:"),a.map(function(e){return s.a.createElement("div",{key:e.id},e.name)})),this.props.loggedInAs&&void 0!==a.find(function(t){return t.id===e.props.loggedInAs.id})?s.a.createElement("div",{className:"join-event"},s.a.createElement("button",{className:"join-event-button",onClick:function(){return e.props.acceptInvitation(e.props.loggedInAs.token,e.props.loggedInAs.id,e.props.data.id)}},"Join Event")):null)),this.props.active?s.a.createElement("div",null,r?s.a.createElement(ge,{eventID:this.props.data.id}):null,s.a.createElement(ee,{placeSuggestions:this.props.placeSuggestions,eventID:this.props.data.id,viewingAsMember:r})):null),s.a.createElement("div",{className:"event-display-right-column"},s.a.createElement(Z,{eventID:this.props.data.id,messages:this.props.messages,users:Object(R.index)(n,"id"),viewingAsMember:r,active:this.props.active})))}}]),t}(a.Component),me={acceptInvitation:function(e,t,n){return D("acceptInvitation",{token:e,user_id:t,event_id:n})},clickOnEvent:function(e){return{type:_,payload:{event_id:e}}},deleteEvent:function(e,t,n){return D("removeEvent",{token:e,user_id:t,event_id:n})}},ve=Object(m.b)(function(e,t){return{invitableUsers:e.users,loggedInAs:e.loggedInAs,eventOwned:e.loggedInAs&&e.loggedInAs.id===t.data.created_by,active:e.activeEvent===t.data.id}},me)(de),he=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=Object(R.group)(this.props.invites,"event_id"),t=Object(R.group)(this.props.placeSuggestions,"event_id"),n=Object(R.group)(this.props.messages,"event_id"),a=this.props.events.sort(function(e,t){return new Date(e.event_date).getTime()-new Date(t.event_date).getTime()});return s.a.createElement("div",{className:"events-list"},a.map(function(a){return s.a.createElement(ve,{data:a,key:a.id,invites:e[a.id]||[],placeSuggestions:t[a.id]||[],messages:n[a.id]||[]})}))}}]),t}(a.Component),fe=Object(m.b)(function(e,t){return{events:e.events,activeEvent:e.activeEvent,invites:e.invites,placeSuggestions:e.placeSuggestions,messages:e.messages}})(he),ye=(n(156),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return null===this.props.loggedInAs?s.a.createElement("div",{className:"login-area"},s.a.createElement("form",null,s.a.createElement("input",{type:"text",placeholder:"Username",value:this.props.loginUsername,onChange:function(t){return e.props.changeLoginUsername(t.target.value)}}),s.a.createElement("input",{type:"password",placeholder:"Password",value:this.props.loginPassword,onChange:function(t){return e.props.changeLoginPassword(t.target.value)}}),s.a.createElement("div",null,s.a.createElement("div",null,s.a.createElement("button",{onClick:function(t){t.preventDefault(),e.props.login(e.props.loginUsername,e.props.loginPassword)}},"Login")),s.a.createElement("div",null,s.a.createElement("button",{onClick:function(t){t.preventDefault(),e.props.createNewUser(e.props.loginUsername,e.props.loginPassword)}},"Sign Up"))))):s.a.createElement("div",{className:"login-area"},s.a.createElement("div",{className:"logged-in-text"},"Logged in as ",this.props.loggedInAs.name),s.a.createElement("div",null,s.a.createElement("button",{onClick:function(){return e.props.logout(e.props.loggedInAs.token,e.props.loggedInAs.id)}},"Logout")))}}]),t}(a.Component)),Ee={login:function(e,t){return Ue.dispatch({type:y}),D("login",{username:e,password:t})},createNewUser:function(e,t){return Ue.dispatch({type:y}),D("signUp",{username:e,password:t})},logout:function(e,t){return Ue.dispatch({type:E}),D("logout",{token:e,user_id:t})},changeLoginUsername:function(e){return{type:h,payload:{username:e}}},changeLoginPassword:function(e){return{type:f,payload:{password:e}}}},be=Object(m.b)(function(e,t){return{loggedInAs:e.loggedInAs,loginUsername:e.loginUsername,loginPassword:e.loginPassword}},Ee)(ye),Oe=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"wrapper"},s.a.createElement("div",{className:"main-view"},s.a.createElement("div",{className:"login-and-events-wrapper"},s.a.createElement("h2",null,"Events!"),s.a.createElement("div",{className:"top-bar"},s.a.createElement("div",{className:"login-wrapper"},s.a.createElement(be,null)),null!==this.props.loggedInAs?s.a.createElement(B,null):null),s.a.createElement("div",{className:"events-list-wrapper","data-tip":"whee"},s.a.createElement(fe,null)))))}}]),t}(a.Component),Ie=Object(m.b)(function(e,t){return{loggedInAs:e.loggedInAs}})(Oe),we=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(Ie,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var je=n(20),Ae=n(77),Ne=n.n(Ae),ke=function(e){return e.sort(function(e,t){return new Date(e.event_date).getTime()-new Date(t.event_date).getTime()})[0]},Ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload,s=Object.assign({},e);switch(n){case"setInitialData":return(s=Object.assign(s,a)).activeEvent=s.events.length>0?ke(s.events).id:null,s;case"updateEventList":return s.events=a,s.activeEvent=null===s.activeEvent&&s.events.length>0?ke(s.events).id:s.activeEvent,s;case"updateInvitableUsersList":return s.users=a,s;case"loginSuccess":return s.loggedInAs=a.user,s;case"updateInvitesList":return s.invites=a,s;case"setPlaceSearchAutocompletes":return console.log(a),s.placeSearchAutocompletes=a,s;case"updatePlaceSuggestions":return s.placeSuggestions=a,s;case"updateMessages":return s.messages=a,s;case"updateOnlineUsers":return s.onlineUsers=a,s;case _:return s.activeEvent=a.event_id,s;case h:return s.loginUsername=a.username,s;case f:return s.loginPassword=a.password,s;case y:return s.loginUsername="",s.loginPassword="",s;case E:return s.loggedInAs=null,s;case b:return s.newEventName=a.name,s;case O:return s.newEventDate=a.date,s;case I:return s.newEventName="",s.newEventDate=Object(R.today)(),s;case w:return s.invitingUserText=a.text,s;case j:return s.invitingUserText="",s;case A:return s.placeSearchText=a.text,s;case N:return s.placeSearchText="",s;case k:return s.placeSearchAutocompletes=[],s;case C:return s.mousedOverSuggestionIDPair=a.idObject,s;case M:return s.currentlyTypingMessage=a.text,s;case U:return s.currentlyTypingMessage="",s;case S:return s.currentlyEditingMessage=a.message_id,s.currentlyEditingMessageContent=a.existingMessage,s;case x:return s.currentlyEditingMessageContent=a.text,s;case T:return s.currentlyEditingMessage=null,s.currentlyEditingMessageContent="",s;default:return e}};n.d(t,"store",function(){return Ue});var _e,Me={events:[],newEventName:"",newEventDate:Object(R.today)(),loginUsername:"",loginPassword:"",loggedInAs:null,invitableUsers:[],invitingUserText:"",invites:[],placeSearchText:"",placeSearchAutocompletes:[],placeSuggestions:[],mousedOverSuggestionIDPair:null,messages:[],currentlyTypingMessage:"",currentlyEditingMessage:null,currentlyEditingMessageContent:"",onlineUsers:[],activeEvent:null},Ue=Object(je.c)(Ce,Me,Object(je.a)(function(e){var t=Ne.a.connect(_e);return[{name:"initialData",function:"setInitialData"},{name:"eventList",function:"updateEventList"},{name:"invitableUsersList",function:"updateInvitableUsersList"},{name:"loggedIn",function:"loginSuccess"},{name:"invitesList",function:"updateInvitesList"},{name:"placeNameMatches",function:"setPlaceSearchAutocompletes"},{name:"placeSuggestions",function:"updatePlaceSuggestions"},{name:"messages",function:"updateMessages"},{name:"onlineUsers",function:"updateOnlineUsers"}].forEach(function(n){t.on(n.name,function(t){e.dispatch({type:n.function,payload:t})})}),function(e){return function(n){if(n.type!==v)return e(n);t.emit(n.payload.eventType,n.payload.socketPayload)}}}));i.a.render(s.a.createElement(m.a,{store:Ue},s.a.createElement(we,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},78:function(e,t,n){e.exports=n(186)},83:function(e,t,n){},85:function(e,t,n){}},[[78,2,1]]]);
//# sourceMappingURL=main.daff6a3e.chunk.js.map