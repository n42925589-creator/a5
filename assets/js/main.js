(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  function esc(s){return s.replace(/[<>&"]/g,'');}
  // Bloom's question builder
  var BL=[['Remember','Recall facts and basic ideas.',['define','list','name','recall','identify'],['What is {t}?','List three key facts about {t}.','Name the main parts or people involved in {t}.']],
    ['Understand','Explain ideas or concepts in your own words.',['explain','summarise','describe','classify','compare'],['Explain {t} in your own words.','Summarise the main idea of {t} in two sentences.','How is {t} similar to something you already know?']],
    ['Apply','Use information in a new situation.',['use','solve','demonstrate','calculate','illustrate'],['How would you use {t} to solve a real problem?','Give a new example that shows {t} in action.','Demonstrate how {t} works step by step.']],
    ['Analyse','Break information into parts and examine relationships.',['analyse','contrast','examine','categorise','question'],['What are the causes and effects of {t}?','Which parts of {t} are most important, and why?','How does {t} differ from a related idea?']],
    ['Evaluate','Justify a decision or point of view.',['judge','justify','critique','assess','defend'],['How effective is {t}? Justify your answer.','What are the strengths and weaknesses of {t}?','Would you recommend {t}? Why or why not?']],
    ['Create','Produce new or original work.',['design','compose','plan','invent','construct'],['Design a project or model that shows {t}.','Propose a new way to improve {t}.','Write a short story or presentation that teaches {t} to a younger learner.']]];
  var li=2,tp=document.getElementById('topic');
  function bloom(){if(!tp)return;var L=BL[li],t=esc(tp.value.trim())||'photosynthesis';
    document.getElementById('b-n').textContent=L[0];document.getElementById('b-d').textContent=L[1];
    document.getElementById('b-q').innerHTML=L[3].map(function(q){return '<li>'+q.replace('{t}','<strong>'+t+'</strong>')+'</li>';}).join('');
    document.getElementById('b-v').innerHTML=L[2].map(function(v){return '<span>'+v+'</span>';}).join('');
    document.querySelectorAll('.pyr span').forEach(function(s,i){s.classList.toggle('on',i===li);});
    document.querySelectorAll('[data-bl]').forEach(function(x){x.setAttribute('aria-pressed',+x.dataset.bl===li?'true':'false');});}
  document.querySelectorAll('[data-bl]').forEach(function(x){x.addEventListener('click',function(){li=+x.dataset.bl;bloom();});});
  if(tp){tp.addEventListener('input',bloom);bloom();}
  // Rubric builder
  var CR={content:['Content &amp; knowledge','accurate, detailed and insightful','accurate with some detail','partly accurate with limited detail','often inaccurate or missing'],
    org:['Organisation','logical and easy to follow throughout','mostly logical with clear sections','some structure but hard to follow in places','little clear structure'],
    evid:['Use of evidence','well-chosen evidence that strongly supports every point','relevant evidence for most points','some evidence, not always relevant','little or no evidence'],
    lang:['Language &amp; style','clear, precise and suited to the audience','clear with minor errors','understandable with frequent errors','errors often get in the way of meaning'],
    pres:['Presentation','polished, consistent and easy to read','neat with minor lapses','uneven or partly unclear','untidy or incomplete'],
    collab:['Collaboration','consistently contributes and supports others','usually contributes and listens','contributes when prompted','rarely contributes']};
  var LV={3:['Exceeds','Meets','Not yet'],4:['Excellent','Good','Developing','Beginning'],5:['Outstanding','Strong','Secure','Developing','Beginning']};
  var rl=4,rf=document.getElementById('rcrit');
  function rubric(){if(!rf)return;var sel=[].slice.call(rf.querySelectorAll('input:checked')).map(function(x){return x.value;}),lv=LV[rl];
    var pick=function(c,i){var d=CR[c];if(rl===4)return d[i+1];if(rl===3)return [d[1],d[2],d[4]][i];return [d[1],d[1].replace(/^/,'')+'',d[2],d[3],d[4]][i];};
    var head='<tr><th>Criterion</th>'+lv.map(function(l,i){return '<th>'+l+' ('+(rl-i)+')</th>';}).join('')+'</tr>';
    var body=sel.length?sel.map(function(c){return '<tr><th>'+CR[c][0]+'</th>'+lv.map(function(l,i){var t=pick(c,i);if(rl===5&&i===0)t='exceptional: '+CR[c][1];if(rl===5&&i===1)t=CR[c][1];return '<td>'+t.charAt(0).toUpperCase()+t.slice(1)+'</td>';}).join('')+'</tr>';}).join(''):'<tr><td colspan="'+(rl+1)+'">Choose at least one criterion.</td></tr>';
    document.getElementById('r-t').innerHTML='<thead>'+head+'</thead><tbody>'+body+'</tbody>';
    document.getElementById('r-m').textContent='Maximum score: '+(sel.length*rl)+' points ('+sel.length+' criteria × '+rl+' levels)';
    document.querySelectorAll('[data-rl]').forEach(function(x){x.setAttribute('aria-pressed',+x.dataset.rl===rl?'true':'false');});}
  if(rf){rf.addEventListener('change',rubric);document.querySelectorAll('[data-rl]').forEach(function(x){x.addEventListener('click',function(){rl=+x.dataset.rl;rubric();});});rubric();}
  // Learning theory explorer
  var TH={beh:['Behaviourism','Learning is a change in observable behaviour, shaped by reinforcement and practice.','B. F. Skinner, John B. Watson, Edward Thorndike','Clear routines, practice with immediate feedback and positive reinforcement for desired behaviour.','Can overlook understanding and motivation from within.'],
    cog:['Cognitivism','Learning is about how the mind takes in, organises, stores and retrieves information.','Jean Piaget (cognitive development), John Sweller (cognitive load), Jerome Bruner','Breaking content into small steps, worked examples, diagrams and regular retrieval practice.','Focuses on the individual mind more than social context.'],
    con:['Constructivism','Learners build their own understanding by connecting new experiences to what they already know.','Jean Piaget, Jerome Bruner, John Dewey','Hands-on investigations, open questions and projects that start from learners&#8217; ideas.','Beginners can struggle without enough guidance and structure.'],
    soc:['Social learning','People learn by observing, imitating and interacting with others, especially with more skilled partners.','Lev Vygotsky (zone of proximal development), Albert Bandura','Modelling, peer tutoring, group work and scaffolding that is gradually removed.','Depends on good models and well-managed group dynamics.'],
    conn:['Connectivism','Learning happens across networks of people, tools and information, especially in digital settings.','George Siemens, Stephen Downes','Curating sources, online communities and teaching learners to evaluate information.','A newer idea, still debated as a full theory of learning.']};
  function theo(k){var t=TH[k],o=document.getElementById('t-n');if(!o)return;o.textContent=t[0];
    document.getElementById('t-l').innerHTML='<dt>Key idea</dt><dd>'+t[1]+'</dd><dt>Associated with</dt><dd>'+t[2]+'</dd><dt>In practice</dt><dd>'+t[3]+'</dd><dt>Limitation</dt><dd>'+t[4]+'</dd>';
    document.querySelectorAll('[data-th]').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.th===k?'true':'false');});}
  document.querySelectorAll('[data-th]').forEach(function(x){x.addEventListener('click',function(){theo(x.dataset.th);});});
  theo('soc');
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('pc_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('pc_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
