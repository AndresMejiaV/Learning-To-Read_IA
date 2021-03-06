function addText(text, target, op_title="Resultado") {

    var element = target;
    console.log("Target ", element);
    if (element.tagName.toLowerCase() == "button" || element.tagName.toLowerCase() == "input"){
        element = element.parentNode;
    }

    // Set to append the text
    element = element.getElementsByClassName("result-text")[0];
    element.innerHTML = "";

    var textnode = document.createTextNode(text); 
    
    var title = document.createElement('h3');
    title.class = "title";
    title.id = "img-result-title";
    title.innerHTML = op_title;

    // Append the title
    element.appendChild(title);
    // Append the text
    element.appendChild(textnode);
}

// Local files
// function getImgText(e) {

//     e = e || window.event;
//     var target = e.target || e.srcElement;

//     var fileInput = document.querySelector('#img-File');
    
//     var formData = new FormData();
//     formData.append('file', fileInput.files[0]);
    
//     var imgField = document.getElementById("image");

//     fetch("/analyze-img-local", {
//         method: "POST",
//         body: formData
//     })
//     .then(res => res.text())
//     .then(data => {
//         console.log("Request complete! response:", data);

//         // Add the returned text by the /analyze-img request in the p element
//         addText(data, target);
//         console.log("Uploaded file: ", file);
//         img.src = "../uploads/" + fileInput.name;

//     })
//     .catch(err => console.log("Could not upload file"));
// }


// External
function getImgText(e) {

    e = e || window.event;
    var target = e.target || e.srcElement;
    
    var imgField = document.getElementById("image");
    var url = document.getElementById("image-url").value;

    console.log("Url: ", url);
    const data = {
        "url": url,
    }

    fetch("/analyze-img-remote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(res => res.text())
    .then(data => {
        console.log("Request complete! response:", data);

        // Add the returned text by the /analyze-img request in the p element
        addText(data, target);
        imgField.src = url;

    })
    .catch(err => console.log("Something went wrong..."));
}


function analyzeText(e) {

    // var target = document.getElementById("text-analytics");
    e = e || window.event;
    var target = e.target || e.srcElement;

    var text = document.getElementById("key-phrases-input").value;
    text = text.trim();
    console.log("Text: ", text);

    const data = {
        "text": text,
    }

    fetch("/key-phrases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        console.log("Request /key-phrases complete: ", data);
        addText(data, target);
    })
}


function dictionary (e) {

    e = e || window.event;
    var target = e.target || e.srcElement;

    var word = document.getElementById("user-word").value;

    const data = {
        "word": word,
    }

    fetch("/oxford-dictionary", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(response => {
        console.log("Dictionary POST: ", response);
        addText(response, target);
    })
    .catch(console.log("Error when requesting /oxford-dictionary"));

}

function translate (e) {

    e = e || window.event;
    var target = e.target || e.srcElement;

    var input = document.getElementById("translate-input").value;

    const data = {
        "text": input,
    }

    fetch("/translate", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(response => {
        console.log("Translate POST: ", response);
        addText(response, target);
    })
    .catch(console.log("Error when requesting /translate"));

}


function generateStory (e) {
    
    const stories = [
    
        // Cuento 1
    
        `
        Carlos entiende la importancia de las vacunas.
        Si algo algo ten??a claro Carlos es que, muchas veces, lo desconocido nos da miedo. Por eso es tan importante conocer, investigar o preguntar cuando no sabemos algo y queremos salir de dudas. Un d??a, le pas?? exactamente eso con el tema de las vacunas. Carlos ten??a mucho miedo al pinchazo, pero el enfermero que hab??a ido al colegio se esforz?? en explicar a los ni??os de qu?? se trataba para que entendieran lo importante que eran las vacunas.
    
        Les dijo que hoy es posible prevenir enfermedades que hace tiempo eran incurables y que se cobraban la vida de muchas personas. Por ejemplo, la difteria, la viruela, la poliomielitis o el sarampi??n. Todo lo podemos prevenir gracias a las vacunas.
        
        -??Qui??n las invent???- pregunt?? curioso un ni??o de la primera fila.
        
        El enfermero les cont?? que en realidad las vacunas eran algo bastante reciente.
        
        - Hace unos 200 a??os en el Reino Unido, un m??dico llamado Edward Jenner observ?? que a algunas mujeres que orde??aban vacas no les afectaba la viruela si ya hab??an sido infectadas por la viruela bovina..
        
        A ese m??dico se le ocurri?? agregar una peque??a cantidad de la viruela que afectaba a las vacas a un ni??o para que ese procedimiento le inmunizase contra la infecci??n. Y as?? lo hizo. Ese experimento fue el antecedente de lo que luego ser??an las vacunas.
        
        Casi 100 a??os despu??s, el doctor Pasteur demostr?? que algunas enfermedades pod??an evitarse al infectar a las personas con g??rmenes debilitados. En 1885 utiliz?? una vacuna para prevenir la rabia en un ni??o que hab??a sido mordido por un perro. A mitad del siglo 20 se desarroll?? la vacuna contra la poliomielitis.
        
        -En la actualidad, las vacunas son claves en la medicina moderna- sigui?? el enfermero.
        
        -Pero ??c??mo funcionan?- dijo Carlos.
        
        El enfermero explic?? que las vacunas enga??an al sistema inmunol??gico haci??ndole pensar que est?? siendo atacado por un agente infeccioso para que se defienda. El microorganismo que lleva la vacuna est?? muerto o muy debilitado y por eso no es peligroso.
        
        Carlos entiende la importancia de las vacunas-Se trata de que el sistema inmune reaccione generando anticuerpos.- sigui?? el enfermero.
        
        Suelen ser necesarias varias dosis para lograr que la inmunidad se mantenga con el tiempo.
        
        -Por eso son tan importantes los calendarios vacunales y que, cuando corresponda, vay??is a los centros de salud a ponernos las vacunas que os corresponden seg??n vuestra edad.
        
        Carlos sali?? ese d??a del cole sin miedo alguno a las vacunas y siendo consciente de lo importantes que son para mantenernos sanos.`,
    
    
    
        // Cuento 2
    
    
        `
        El reto de Do??a Tortugona.
        Do??a Tortugona se hab??a hecho famosa por ser la ??nica tortuga en el mundo capaz de vencer a una liebre en una carrera. Tal fama es la que hab??a alcanzado que hasta le hab??an dedicado un cuento. Gracias a su gran triunfo, Do??a Tortugona hab??a recibido todo tipo de halagos.
    
        A Do??a Tortugona, acostumbrada a una vida de paz y sosiego, tanta fama empez?? pareci??ndole algo abrumador, pero con el tiempo se fue acostumbrando. Lleg?? incluso a gustarle.
        
        La que lo estaba pasando mal era la pobre liebre. Vencida y derrotada, hab??a sido tambi??n desterrada. Ninguna liebre quer??a tener cerca a aquella que hab??a conseguido dejarlas a todas en rid??culo. Por m??s que entren?? y se esforz??, nadie quiso volver a saber de ella.
        
        Pasaron los a??os y Do??a Tortugona segu??a siendo una estrella, mientras que la pobre liebre viv??a sola en el bosque. Pero quiso el destino volver a juntar a ambas, liebre y tortuga.
        
        Esa ma??ana de domingo, la liebre estaba comiendo hierbas cerca de un camino poco transitado. De repente, se oy?? un murmullo que se acercaba lentamente. La liebre se escondi?? entre los matorrales para ver qu?? pasaba. Pronto descubri?? que se trataba de un grupo de tortugas representando la m??tica carrera de la tortuga y la liebre. Solo que esta vez no hab??a liebre, sino una tortuga disfrazada haciendo la pantomima.
        
        -Dicen que este a??o vendr?? Do??a Tortugona en persona -dijo una tortuga, dirigi??ndose a otra-. Celebraremos juntas el gran d??a.
        
        Al poco lleg?? Do??a Tortugona. Todas las dem??s tortugas empezaron a gritar de j??bilo por la llegada de su ilustre compa??era.
        
        -??Que corra, que corra! -gritaban las tortugas.
        
        -Est?? bien, yo misma repetir?? la gran carrera -concedi?? Do??a Tortugona.
        
        -As?? podremos re??rnos otra vez de la liebre fanfarrona -dijo una tortuga.
        
        La liebre, que lo oy?? todo, estaba muy triste. Despu??s de tantos a??os a??n segu??an ri??ndose y burl??ndose de ella.
        
        -No deber??as permitirlo -le dijo un grillo a la liebre.-
        
        -Ya, pero, ??c??mo evitarlo? En el fondo, tal vez tengan raz??n.
        
        -Cometiste un error, un gran error, pero eso es todo. Si ahora desafiaras otra vez a la tortuga???
        
        -??No digas bobadas! No querr??a correr otra vez.
        
        -Cierto. Su mito caer??a y ella tambi??n. Los que ahora la alaban la despreciar??an. Y los que te desprecian a ti te adorar??an. ??V??ngate de esa tortuga mezquina! ??Est??s en tu derecho!
        
        -??Cierto! Gracias, amigo, por devolverme la ilusi??n.
        
        La liebre sali?? al camino y se plant?? entre las tortugas.
        
        -En esta fiesta a??n falta otro gran protagonista. ??Yo! -dijo la liebre.
        
        -????T???! -dijo la tortuga.
        
        -Es justo que yo tambi??n participe en la carrera conmemorativa, ??no te parece? Aunque mejor podr??amos correr de nuevo, ya sabes, la revancha. Es lo justo.
        
        Do??a Tortugona no sab??a qu?? hacer. Hab??a ido all?? a ser vitoreada, no a ser humillada. Tal fue el susto que se llev?? que se qued?? blanca. Una mariposa que estaba por all?? le dijo al o??do:
        
        -Si no corres te llamar??n cobarde. Corre y demu??strales lo que vales.
        
        -Perder?? y se reir??n de m?? -le dijo Do??a Tortugona
        
        -Si no corres tambi??n se reir??n de ti. Si tienes que caer, que sea como una valiente.
        
        Finalmente la tortuga acept?? el reto, sabiendo que era su final. La liebre se puso muy contenta. Por fin podr??a demostrar lo que val??a. Hab??a o??do la conversaci??n entre Do??a Tortugona y la mariposa, y eso le dio a??n m??s ??nimos.
        
        Dieron la salida. La liebre sali?? lanzada, mientras Do??a Tortugona, fiel a su naturaleza, avanzaba despacio. A medida que corr??a a la liebre le vino a la mente lo mal que lo hab??a pasado todos esos a??os. ??De verdad quer??a lo mismo para Do??a Tortugona?
        
        El reto de Do??a TortugonaLa liebre empez?? a correr m??s despacio. Ganar no le har??a recuperar el tiempo perdido. De pronto, la liebre vio que llegaba al campo de zanahorias donde a??os atr??s se hab??a entretenido. No hab??a vuelto a comer zanahorias desde entonces. Y tom?? una decisi??n.
        
        La liebre se dio la vuelta y se puso a la altura de la tortuga.
        
        -??Qu?? haces? -pregunt?? Do??a Tortugona.
        
        -He pensado acompa??arte -dijo la liebre-. Despu??s de tantos a??os sin vernos tenemos muchas cosas que contarnos.
        
        Antes la mirada estupefacta de todos, liebre y tortuga avanzaron juntas hasta la l??nea de meta.
        
        -T?? primero -dijo la liebre.
        
        -No es justo -dijo Do??a Tortugona-. Pasa t?? primero.
        
        -Entremos juntas -dijo la liebre.
        
        Liebre y tortuga cruzaron juntas la l??nea de meta mientras el p??blico estallaba en aplausos. Nadie m??s volvi?? a re??rse de la liebre, que recuper?? su puesto entre los suyos, a los que demostr?? que m??s importante que ganar una carrera es ganar amigos y, sobre todo, perdonarse cuando haces algo mal, por muy humillante que resulte. Y es que solo as?? conseguir??s que los dem??s te perdonen. Al fin y al cabo, todos valemos mucho m??s que el resultado de una competici??n. `,
    
    
    
        // Cuento 3
    
        `
        La pesadilla de los hermanos Green.
        Los gemelos Jacobo y Guillermo llevaban a??os viajando con sus padres, que formaban parte de una de las compa????as de circo m??s importantes de Europa. Los Green formaban un d??o perfecto sobre el trapecio, un d??o que emocionaba a todo el que los ve??a volar. Pero debido a una enfermedad de la madre, la familia decidi?? volver a Espa??a e instalarse en la vieja casa familiar.
    
        Jacobo y Guillermo tuvieron que ir a la escuela. Hasta entonces hab??an aprendido de sus padres y de otros compa??eros, siguiendo un programa de estudios especial para ni??os como ellos. Pero cuando el circo se acab??, los hermanos Green tuvieron que ir a la escuela, como todos los dem??s. Esto supuso un duro golpe para ellos, pero enfrentaron la nueva situaci??n como reto m??s.
        
        -Damos la bienvenida a dos nuevos compa??eros, Jacobo y Guillermo Green -dijo la maestra el d??a que los hermanos se incorporaron a clase.
        
        -??Mira, si tenemos una pareja de escritores entre nosotros! -dijo Antonio, el graciosillo de la clase-. Me encant?? el del soldadito de plomo, aunque ese del emperador que sale desnudo a la calle es muy bueno tambi??n.
        
        -Esos cuentos son de Andersen -le dijo Jacobo.
        
        -??De qui??n? -pregunt?? Antonio, que se sent?? al ver c??mo todos se re??an de su ignorancia.
        
        -Sentaros, chicos, por favor, vamos a comenzar -dijo la maestra, intentando quitarle hierro al asunto. Pero el asunto estaba al rojo vivo.
        
        -Me las pagar??is, payasos -pens?? Antonio.
        
        Durante d??as, Antonio y sus compinches estuvieron mof??ndose de los hermanos Green. Al principio Jacobo y Guillermo se lo tomaron como una broma pesada, incluso intentaron seguirles el juego, a ver si se aburr??an de una vez, pero tras varios d??as se dieron cuenta de que hab??a algo que no encajaba.
        
        Un d??a, Jacobo descubri?? lo que pasaba.
        
        -Guillermo, creo que lo que pasa es que confunden nuestro apellido, Green, con el apellido de los famosos escritores alemanes del principio del siglo XIX, los Hermanos Grimm.
        
        -??No es posible? -dijo Guillermo-. Yo pens?? que lo dec??an por hacer la gracia. Pues menos mal que no se han dado cuenta que nuestros nombres en espa??ol son los de los Hermanos Grimm pero traducidos al espa??ol, Jacob y Wilhelm, que si no???.
        
        -Tendr??amos que dec??rselo, ??no te parece? -dijo Jacobo.
        
        Los hermanos Green explicaron a sus compa??eros las diferencias entre Grimm y Green, pero para su sorpresa, Antonio se enfad?? a??n m??s.
        
        -No pasa nada, hombre, es una peque??a equivocaci??n -dijo Jacobo, intentando apaciguar a Antonio. Pero este, sin mediar palabra, se le ech?? encima.
        
        A Jacobo le dio tiempo a esquivar a Antonio, que se dio un buen trompazo contra el suelo. Esto hizo re??r a todos los que lo hab??an presenciado y atrajo las miradas de otros ni??os.
        
        -??V??monos, corre! -dijo Guillermo a su hermano.
        
        Y ambos se marcharon de all??, mientras Antonio les gritaba:
        
        -La pr??xima vez no tendr??is tanta suerte.
        
        Jacobo y Guillermo intentaron evitar a Antonio y a sus secuaces todo lo que pudieron, pero al final les pillaron a la salida del colegio y les rodearon.
        
        -Somos ocho contra dos -dijo Antonio-. A ver qu?? hac??is ahora.
        
        Jacobo y Guillermo se miraron. Uno dijo:
        
        -Tocamos a cuatro.
        
        -Intentemos no pegarles, que luego nos la cargamos nosotLa pesadilla de los hermanos Greenros.
        
        Nadie lo sab??a, pero Jacobo y Guillermo eran expertos en artes marciales. En el circo hab??an hecho interesantes n??meros de lucha acrob??tica. Y sin tocarles un pelo, consiguieron dejarlos a todos K.O.
        
        -??No crees que deber??amos dejar esto ya, Antonio? -dijo Jacobo.
        
        -Hagamos las paces -insisti?? Guillermo.
        
        -??Las paces? ??Y quedar como un pringao? -dijo Antonio.
        
        -No digas bobadas -dijo Jacobo-, no vas a quedar como un pringao. Si insistes en meterte con nosotros y vuelves a??? en fin, si nosotros???.
        
        -Est?? bien, hagamos las paces -dijo Antonio, d??ndose cuenta de que pegarse con ellos no iba a ninguna parte-. ??Pero vais a tener que ayudarnos a explicar todos estos golpes!
        
        -??Claro! Siempre podemos decir que os ense????bamos artes marciales -dijo Guillermo.
        
        -??Eso nos har?? parecer guays! ??Buena idea! -dijo Antonio. Y todos se fueron a dar una vuelta.
        
        -??Habr?? terminado la pesadilla? -pregunt?? Jacobo a su hermano.
        
        -Para nosotros tal vez s??, pero para miles de ni??os en este pa??s y en otros mucho me temo que no. `,
    
    
    
        // Cuento 4
    
    
        `El misterio de las casta??as. 
        A Julio le encantaban las casta??as. Eran sus frutos secos favoritos. Le gustaba comerlas crudas, asadas, cocidas, confitadas o en alm??bar. De todas las formas posibles. De hecho, si le dejasen, las comer??a a todas horas. Cada a??o, Julio esperaba impaciente la ??poca de las casta??as.
    
        Desde octubre y hasta mediados de diciembre, muchos fines de semana iba con sus primos al bosque a coger bolsas y bolsas que despu??s repart??a entre los vecinos. Muchas veces en su casa las usaban para preparar mermelada o crema para rellenar las tartas.
        
        A veces montaba un peque??o puesto en la entrada de su casa y vend??a cucuruchos de casta??as asadas a las personas que pasaban por la calle. Como las vend??a muy baratas casi todo el mundo le compraba y enseguida ten??a que ir a casa a asar m??s. Le encantaba pasar las tardes as??, disfrutando del olor de las casta??as al salir del horno y charlando con la gente que se deten??a en su peque??o puesto callejero.
        
        Un d??a, recorriendo el interior del bosque en busca de casta??as, Julio encontr?? algo muy extra??o: un mont??n de erizos, la parte de fuera de la casta??a, la que est?? plagada de pinchos. Lo realmente sorprendente fue que estaban vac??os. Julio sab??a que cada erizo sol??a tener m??s o menos 2 o 3 casta??as. Pero estos con los que se encontr?? estaban huecos. Ni rastro de las casta??as que hab??a ido a buscar.
        
        Julio, que hab??a ido al bosque con su primo y su t??o Pablo, fue r??pidamente a avisarles. Pronto pudieron ver lo mismo que hab??a descubierto el ni??o. Ninguna casta??a, ni en el suelo ni en los ??rboles. Fueron a avisar al guardabosques. Le explicaron lo que pasaba y le pidieron que les ayudase.
        
        EEl misterio de las casta??asl hombre les coment?? que a veces las ardillas se llevaban muchas casta??as, pero que en este caso era raro, porque no hab??a ninguna. Llam?? a la polic??a porque el bosque era muy grande para recorrerlo ??l solo. Al cabo de 3 horas mirando en cada rinc??n, encontraron la respuesta a todo el misterio. Una nueva f??brica de dulce de casta??as se las hab??a llevado todas para aumentar la producci??n. Hab??an empezado a vender su dulce en otros pa??ses y ten??an que fabricar muchos tarros al cabo del d??a.
        
        Al final, los due??os de la f??brica entendieron que no pod??an llevarse todas las casta??as del bosque porque la gente del pueblo tambi??n quer??a cogerlas. Llegaron a un acuerdo para repartirlas. Un acuerdo justo para todos que a Julio le permiti?? volver a comer casta??as cada oto??o y a pasar tardes divertidas en el bosque recogi??ndolas. `,
    
    
        // Cuento 5
    
        `
        El cuervo y las palomas.
        Hab??a una vez un cuervo solitario que miraba con envidia a las hermosas palomas. ??La blancura de sus plumas era tan hermosa al lado de su horrible y t??trico plumaje! Las palomas, al sentirse observadas y admiradas, presum??an de su belleza ante su vecino cuervo, al que miraban con desd??n y desprecio.
    
        -??Qu?? hermosas son las palomas blancas! -suspiraba el cuervo-. ??Qui??n fuera paloma para disfrutar de tanta belleza?
        
        Un d??a al cuervo se le ocurri?? pintarse de blanco y colarse en el palomar. Decidido a hacerse pasar por paloma, el cuervo se col?? en el molino y se dio un buen ba??o de harina. Cuando se vio bien embadurnado, el cuervo ech?? a volar. Cuando lleg?? al palomar ninguna paloma se dio cuenta del enga??o. Pero ese d??a empez?? a llover y el agua se llev?? toda la harina, dejando al descubierto el negro plumaje del cuervo.
        
        -??Fuera, impostor, vete de aqu??! -gritaron las palomas.
        
        El cuervo se fue volando tan r??pido como pudo, temeroso de ser atacado por cientos de palomas rabiosas. Cuando lleg?? a su guarida el cuervo, por fin, pudo tomarse un descanso. Pero poco tard?? el cuervo en empezar a pensar en otra forma de conseguir que sus plumas fueran blancas.
        
        -Me las pintar?? con pintura blanca -pens?? el cuervo. Y r??pidamente se col?? en el almac??n de un pintor y se dio un buen ba??o en pintura blanca.
        
        Cuando estuvo listo, el cuervo vol?? de nuevo al palomar, donde ninguna de las palomas se dio cuenta del nuevo enga??o. Durante unos d??as el cuervo se qued?? con ellas, pero sin perder de vista el cielo, por si volv??a a llover, para poder esconderse del agua..
        
        Pero un d??a, mientras el cuervo disfrazado de paloma jugaba con sus nuevas compa??eras en una plaza, cerca de una fuente, un ni??o cogi?? un cubo de agua y se lo lanz?? a las palomas. La pintura empez?? a caerse de las plumas del cuervo que, sabi??ndose descubierto, huy?? sin m??s.
        
        -Tengo que encontrar la forma de que mis plumas se vuelvan blancas para siempre -pens?? el cuervo. Y tuvo otra de sus grandes ideas. ??Deste??irse las plumas con lej??a!
        
        El cuervo busc?? una lavander??a y, aprovechando un despiste de los trabajadores, se dio un ba??o de lej??a. Sus plumas quedaron de un blanco inmaculado.
        
        -El blanco de mis plumas ser?? la envidia de las dem??s palomas -pens?? el cuervo. Y sali?? volando al palomar.
        
        Los d??as pasaron y ninguna de las palomas de dio cuenta del regreso del cuervo. El cuervo se fue acostumbrando y, poco a poco, olvid?? que era un cuervo y no una paloma.El cuervo y las palomas Hasta que un d??a se relaj?? tanto que olvid?? que, por muy blancas que fueran sus plumas, su graznido nunca ser??a tan dulce como el ulular de las palomas, y al abrir el pico para decir algo:
        
        -??Cruaaac-cruaaac!
        
        Las palomas se quedaron mirando al cuervo que, al darse cuenta de su error, sali?? volando.
        
        El cuervo se refugi?? en su guarida, pero cuando los otros cuervos lo vieron no fueron capaces de reconocerlo, por lo que lo echaron de all??.
        
        Tiempo despu??s las palomas fueron a buscar al cuervo y le invitaron a vivir con ellas, pues tanta insistencia y admiraci??n abland?? su coraz??n. Solo le pusieron una condici??n: que aprendiera a emitir un sonido algo m??s parecido al que hacen las palomas. El cuervo se comprometi?? a intentarlo. Y as?? vivi?? feliz entre sus nuevas amigas durante muchos a??os. `
    ]
    

    e = e || window.event;
    var target = e.target || e.srcElement;

    // Return a random story
    let story = stories[Math.ceil(Math.random() * stories.length) - 1];
    var title = story.slice(0, story.indexOf('.'));
    story = story.slice(story.indexOf('.')+2);

    addText(story, target, title);

}


function setSpeechIconsAnimation () {
    var speechElements = document.getElementsByClassName("speech-buttons");


    console.log("Set speech icon animation");
    for (element of speechElements) {
        parent = element.parentNode;

        parent.addEventListener("mouseover", function( event ) {
            var target = event.target || event.srcElement;
            target = target.parentNode;
        
            
            // Alternate display block and display none every time on mouseover is activated
            setTimeout(function() {
                target.getElementsByClassName("speech-buttons")[0].style.display = "none";
            }, 1000);
            target.getElementsByClassName("speech-buttons")[0].style.display = "block";


            // target.getElementsByClassName("speech-buttons")[0].style.display = "none";
            // while (target) {
            //     target.getElementsByClassName("speech-buttons")[0].style.display = "block";
            // }

        }, false);
    }
}