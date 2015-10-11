const {
    Button,
    ListGroup,
    ButtonToolbar,
    Nav,
    NavItem
    } = rbs;

Topic = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user(),
            topic: Topics.findOne(this.props.topicId),
            questions: Questions.find({ topicId: this.props.topicId}, {sort: {points: -1}}).fetch(),
            responses: Responses.find({ownerId: Meteor.userId(), topicId: this.props.topicId}).fetch()
        };
    },
    findResponse(questionId){
        return _.find(this.data.responses, function(response){
            return response.questionId === questionId;
        });
    },
    renderQuestions(){
        return this.data.questions.map((question) => {
                return (
                    <Question
                        key={question._id}
                        question={question}
                        topic={this.data.topic}
                        user={this.data.user}
                        response={this.findResponse(question._id)}/>
                )
            }
        );
    },

    renderAddQuestion() {
        console.log(this.data.topic.ownerId, Meteor.userId(), this.data.topic.ownerId == Meteor.userId())
        if (this.data.topic.ownerId == Meteor.userId()) {
            return (
                <div className="floating">
                    <Button bsStyle="btn-danger btn-floating" href={"/topic/" + this.props.topicId + "/question"}>+</Button>
                </div>
            )
        }
    },

    determineHashtag() {
        //determine what is the topic about
        //console.log(this.data.topic.title);
        //return "hashtag";

        commonArray = ['the','of','and','to','a','in','for','is','on','that','by','this','with','i','you','it','not','or','be','are','from','at','as','your','all','have','new','more','an','was','we','will','home','can','us','about','if','page','my','has','search','free','but','our','one','other','do','no','information','time','they','site','he','up','may','what','which','their','news','out','use','any','there','see','only','so','his','when','contact','here','business','who','web','also','now','help','get','pm','view','online','c','e','first','am','been','would','how','were','me','s','services','some','these','click','its','like','service','x','than','find','price','date','back','top','people','had','list','name','just','over','state','year','day','into','email','two','health','n','world','re','next','used','go','b','work','last','most','products','music','buy','data','make','them','should','product','system','post','her','city','t','add','policy','number','such','please','available','copyright','support','message','after','best','software','then','jan','good','video','well','d','where','info','rights','public','books','high','school','through','m','each','links','she','review','years','order','very','privacy','book','items','company','r','read','group','sex','need','many','user','said','de','does','set','under','general','research','university','january','mail','full','map','reviews','program','life','know','games','way','days','management','p','part','could','great','united','hotel','real','f','item','international','center','ebay','must','store','travel','comments','made','development','report','off','member','details','line','terms','before','hotels','did','send','right','type','because','local','those','using','results','office','education','national','car','design','take','posted','internet','address','community','within','states','area','want','phone','dvd','shipping','reserved','subject','between','forum','family','l','long','based','w','code','show','o','even','black','check','special','prices','website','index','being','women','much','sign','file','link','open','today','technology','south','case','project','same','pages','uk','version','section','own','found','sports','house','related','security','both','g','county','american','photo','game','members','power','while','care','network','down','computer','systems','three','total','place','end','following','download','h','him','without','per','access','think','north','resources','current','posts','big','media','law','control','water','history','pictures','size','art','personal','since','including','guide','shop','directory','board','location','change','white','text','small','rating','rate','government','children','during','usa','return','students','v','shopping','account','times','sites','level','digital','profile','previous','form','events','love','old','john','main','call','hours','image','department','title','description','non','k','y','insurance','another','why','shall','property','class','cd','still','money','quality','every','listing','content','country','private','little','visit','save','tools','low','reply','customer','december','compare','movies','include','college','value','article','york','man','card','jobs','provide','j','food','source','author','different','press','u','learn','sale','around','print','course','job','canada','process','teen','room','stock','training','too','credit','point','join','science','men','categories','advanced','west','sales','look','english','left','team','estate','box','conditions','select','windows','photos','gay','thread','week','category','note','live','large','gallery','table','register','however','june','october','november','market','library','really','action','start','series','model','features','air','industry','plan','human','provided','tv','yes','required','second','hot','accessories','cost','movie','forums','march','la','september','better','say','questions','july','yahoo','going','medical','test','friend','come','dec','server','pc','study','application','cart','staff','articles','san','feedback','again','play','looking','issues','april','never','users','complete','street','topic','comment','financial','things','working','against','standard','tax','person','below','mobile','less','got','blog','party','payment','equipment','login','student','let','programs','offers','legal','above','recent','park','stores','side','act','problem','red','give','memory','performance','social','q','august','quote','language','story','sell','options','experience','rates','create','key','body','young','america','important','field','few','east','paper','single','ii','age','activities','club','example','girls','additional','password','z','latest','something','road','gift','question','changes','night','ca','hard','texas','oct','pay','four','poker','status','browse','issue','range','building','seller','court','february','always','result','audio','light','write','war','nov','offer','blue','groups','al','easy','given','files','event','release','analysis','request','fax','china','making','picture','needs','possible','might','professional','yet','month','major','star','areas','future','space','committee','hand','sun','cards','problems','london','washington','meeting','rss','become','interest','id','child','keep','enter','california','porn','share','similar','garden','schools','million','added','reference','companies','listed','baby','learning','energy','run','delivery','net','popular','term','film','stories','put','computers','journal','reports','co','try','welcome','central','images','president','notice','god','original','head','radio','until','cell','color','self','council','away','includes','track','australia','discussion','archive','once','others','entertainment','agreement','format','least','society','months','log','safety','friends','sure','faq','trade','edition','cars','messages','marketing','tell','further','updated','association','able','having','provides','david','fun','already','green','studies','close','common','drive','specific','several','gold','feb','living','sep','collection','called','short','arts','lot','ask','display','limited','powered','solutions','means','director','daily','beach','past','natural','whether','due','et','electronics','five','upon','period','planning','database','says','official','weather','mar','land','average','done','technical','window','france','pro','region','island','record','direct','microsoft','conference','environment','records','st','district','calendar','costs','style','url','front','statement','update','parts','aug','ever','downloads','early','miles','sound','resource','present','applications','either','ago','document','word','works','material','bill','apr','written','talk','federal','hosting','rules','final','adult','tickets','thing','centre','requirements','via','cheap','nude','kids','finance','true','minutes','else','mark','third','rock','gifts','europe','reading','topics','bad','individual','tips','plus','auto','cover','usually','edit','together','videos','percent','fast','function','fact','unit','getting','global','tech','meet','far','economic','en','player','projects','lyrics','often','subscribe','submit','germany','amount','watch','included','feel','though','bank','risk','thanks','everything','deals','various','words','linux','jul','production','commercial','james','weight','town','heart','advertising','received','choose','treatment','newsletter','archives','points','knowledge','magazine','error','camera','jun','girl','currently','construction','toys','registered','clear','golf','receive','domain','methods','chapter','makes','protection','policies','loan','wide','beauty','manager','india','position','taken','sort','listings','models','michael','known','half','cases','step','engineering','florida','simple','quick','none','wireless','license','paul','friday','lake','whole','annual','published','later','basic','sony','shows','corporate','google','church','method','purchase','customers','active','response','practice','hardware','figure','materials','fire','holiday','chat','enough','designed','along','among','death','writing','speed','html','countries','loss','face','brand','discount','higher','effects','created','remember','standards','oil','bit','yellow','political','increase','advertise','kingdom','base','near','environmental','thought','stuff','french','storage','oh','japan','doing','loans','shoes','entry'];

        wordsArray = [];
        if (this.hasWhiteSpace(this.data.topic.title) > 0) {
            wordsArray = this.data.topic.title.split(" ");
        } else {
            wordsArray.push(this.data.topic.title);
        }

        console.log(wordsArray);

        hashtags = [];
        _.each(wordsArray, function(word, index) {
            word = word.replace(/[^A-Za-z0-9]/g, '');
            index = _.indexOf(commonArray, word.toLowerCase());
            if (index > -1) {
                //hashtags.push(scoredWord);
                //console.log(index); //wordsArray.push({name: word.toLowerCase(), createdAt: new Date(), mood: "neutral"});
            } else {
                hashtags.push(word);
            }

        });

        if(!hashtags.length > 0){   
            scoredWord =  _.max(wordsArray, function(word){
                return _.indexOf(commonArray, word.toLowerCase())
            });
            hashtags.push(scoredWord);
        }

        return hashtags[0];

    },
    hasWhiteSpace(s) {
      return s.indexOf(" ") >= 0;
    },

    renderQuestionTab() {
        return (
            <div>
                {this.renderAddQuestion()}
                <ListGroup>
                    {this.renderQuestions()}
                </ListGroup>
            </div>
        )
    },


    getInitialState() {
        return {
            selectedTab: "Questions"
        }
    },

    handleSelect(tabName) {
        this.setState({selectedTab: tabName})
    },

    render() {


        var feed = new Instafeed({
            get: "tagged",
            tagName: this.determineHashtag(),
            clientId: "99168047378c46e4b7daf7f3ae9eda47"
        });
        feed.run();


        let selectedTab = this.state.selectedTab;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Questions for <strong>{this.data.topic.title}</strong></h1> 
                        <h2><a href={"https://twitter.com/search?q=%23"+this.determineHashtag()}>#{this.determineHashtag()}</a></h2>

                        { this.renderAddQuestion() }
                        <Nav activeKey={selectedTab} bsStyle="tabs" onSelect={this.handleSelect}>
                            <NavItem eventKey={"Questions"}>Questions</NavItem>
                            <NavItem eventKey={"Leaderboard"}>Leaderboard</NavItem>
                        </Nav>
                        { 
                            (selectedTab == "Questions") ?
                                this.renderQuestionTab()
                                :
                                <Leaderboard
                                    topic={this.data.topic}/>
                        }
                        <h2>From the Instawebs on #{this.determineHashtag()}</h2>
                        <div id="instafeed"></div>
                    </div>
                </div>
            </div>
        );
    }
});
