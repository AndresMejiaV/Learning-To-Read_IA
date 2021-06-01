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
        Si algo algo tenía claro Carlos es que, muchas veces, lo desconocido nos da miedo. Por eso es tan importante conocer, investigar o preguntar cuando no sabemos algo y queremos salir de dudas. Un día, le pasó exactamente eso con el tema de las vacunas. Carlos tenía mucho miedo al pinchazo, pero el enfermero que había ido al colegio se esforzó en explicar a los niños de qué se trataba para que entendieran lo importante que eran las vacunas.
    
        Les dijo que hoy es posible prevenir enfermedades que hace tiempo eran incurables y que se cobraban la vida de muchas personas. Por ejemplo, la difteria, la viruela, la poliomielitis o el sarampión. Todo lo podemos prevenir gracias a las vacunas.
        
        -¿Quién las inventó?- preguntó curioso un niño de la primera fila.
        
        El enfermero les contó que en realidad las vacunas eran algo bastante reciente.
        
        - Hace unos 200 años en el Reino Unido, un médico llamado Edward Jenner observó que a algunas mujeres que ordeñaban vacas no les afectaba la viruela si ya habían sido infectadas por la viruela bovina..
        
        A ese médico se le ocurrió agregar una pequeña cantidad de la viruela que afectaba a las vacas a un niño para que ese procedimiento le inmunizase contra la infección. Y así lo hizo. Ese experimento fue el antecedente de lo que luego serían las vacunas.
        
        Casi 100 años después, el doctor Pasteur demostró que algunas enfermedades podían evitarse al infectar a las personas con gérmenes debilitados. En 1885 utilizó una vacuna para prevenir la rabia en un niño que había sido mordido por un perro. A mitad del siglo 20 se desarrolló la vacuna contra la poliomielitis.
        
        -En la actualidad, las vacunas son claves en la medicina moderna- siguió el enfermero.
        
        -Pero ¿cómo funcionan?- dijo Carlos.
        
        El enfermero explicó que las vacunas engañan al sistema inmunológico haciéndole pensar que está siendo atacado por un agente infeccioso para que se defienda. El microorganismo que lleva la vacuna está muerto o muy debilitado y por eso no es peligroso.
        
        Carlos entiende la importancia de las vacunas-Se trata de que el sistema inmune reaccione generando anticuerpos.- siguió el enfermero.
        
        Suelen ser necesarias varias dosis para lograr que la inmunidad se mantenga con el tiempo.
        
        -Por eso son tan importantes los calendarios vacunales y que, cuando corresponda, vayáis a los centros de salud a ponernos las vacunas que os corresponden según vuestra edad.
        
        Carlos salió ese día del cole sin miedo alguno a las vacunas y siendo consciente de lo importantes que son para mantenernos sanos.`,
    
    
    
        // Cuento 2
    
    
        `
        El reto de Doña Tortugona.
        Doña Tortugona se había hecho famosa por ser la única tortuga en el mundo capaz de vencer a una liebre en una carrera. Tal fama es la que había alcanzado que hasta le habían dedicado un cuento. Gracias a su gran triunfo, Doña Tortugona había recibido todo tipo de halagos.
    
        A Doña Tortugona, acostumbrada a una vida de paz y sosiego, tanta fama empezó pareciéndole algo abrumador, pero con el tiempo se fue acostumbrando. Llegó incluso a gustarle.
        
        La que lo estaba pasando mal era la pobre liebre. Vencida y derrotada, había sido también desterrada. Ninguna liebre quería tener cerca a aquella que había conseguido dejarlas a todas en ridículo. Por más que entrenó y se esforzó, nadie quiso volver a saber de ella.
        
        Pasaron los años y Doña Tortugona seguía siendo una estrella, mientras que la pobre liebre vivía sola en el bosque. Pero quiso el destino volver a juntar a ambas, liebre y tortuga.
        
        Esa mañana de domingo, la liebre estaba comiendo hierbas cerca de un camino poco transitado. De repente, se oyó un murmullo que se acercaba lentamente. La liebre se escondió entre los matorrales para ver qué pasaba. Pronto descubrió que se trataba de un grupo de tortugas representando la mítica carrera de la tortuga y la liebre. Solo que esta vez no había liebre, sino una tortuga disfrazada haciendo la pantomima.
        
        -Dicen que este año vendrá Doña Tortugona en persona -dijo una tortuga, dirigiéndose a otra-. Celebraremos juntas el gran día.
        
        Al poco llegó Doña Tortugona. Todas las demás tortugas empezaron a gritar de júbilo por la llegada de su ilustre compañera.
        
        -¡Que corra, que corra! -gritaban las tortugas.
        
        -Está bien, yo misma repetiré la gran carrera -concedió Doña Tortugona.
        
        -Así podremos reírnos otra vez de la liebre fanfarrona -dijo una tortuga.
        
        La liebre, que lo oyó todo, estaba muy triste. Después de tantos años aún seguían riéndose y burlándose de ella.
        
        -No deberías permitirlo -le dijo un grillo a la liebre.-
        
        -Ya, pero, ¿cómo evitarlo? En el fondo, tal vez tengan razón.
        
        -Cometiste un error, un gran error, pero eso es todo. Si ahora desafiaras otra vez a la tortuga…
        
        -¡No digas bobadas! No querría correr otra vez.
        
        -Cierto. Su mito caería y ella también. Los que ahora la alaban la despreciarían. Y los que te desprecian a ti te adorarían. ¡Véngate de esa tortuga mezquina! ¡Estás en tu derecho!
        
        -¡Cierto! Gracias, amigo, por devolverme la ilusión.
        
        La liebre salió al camino y se plantó entre las tortugas.
        
        -En esta fiesta aún falta otro gran protagonista. ¡Yo! -dijo la liebre.
        
        -¡¿Tú?! -dijo la tortuga.
        
        -Es justo que yo también participe en la carrera conmemorativa, ¿no te parece? Aunque mejor podríamos correr de nuevo, ya sabes, la revancha. Es lo justo.
        
        Doña Tortugona no sabía qué hacer. Había ido allí a ser vitoreada, no a ser humillada. Tal fue el susto que se llevó que se quedó blanca. Una mariposa que estaba por allí le dijo al oído:
        
        -Si no corres te llamarán cobarde. Corre y demuéstrales lo que vales.
        
        -Perderé y se reirán de mí -le dijo Doña Tortugona
        
        -Si no corres también se reirán de ti. Si tienes que caer, que sea como una valiente.
        
        Finalmente la tortuga aceptó el reto, sabiendo que era su final. La liebre se puso muy contenta. Por fin podría demostrar lo que valía. Había oído la conversación entre Doña Tortugona y la mariposa, y eso le dio aún más ánimos.
        
        Dieron la salida. La liebre salió lanzada, mientras Doña Tortugona, fiel a su naturaleza, avanzaba despacio. A medida que corría a la liebre le vino a la mente lo mal que lo había pasado todos esos años. ¿De verdad quería lo mismo para Doña Tortugona?
        
        El reto de Doña TortugonaLa liebre empezó a correr más despacio. Ganar no le haría recuperar el tiempo perdido. De pronto, la liebre vio que llegaba al campo de zanahorias donde años atrás se había entretenido. No había vuelto a comer zanahorias desde entonces. Y tomó una decisión.
        
        La liebre se dio la vuelta y se puso a la altura de la tortuga.
        
        -¿Qué haces? -preguntó Doña Tortugona.
        
        -He pensado acompañarte -dijo la liebre-. Después de tantos años sin vernos tenemos muchas cosas que contarnos.
        
        Antes la mirada estupefacta de todos, liebre y tortuga avanzaron juntas hasta la línea de meta.
        
        -Tú primero -dijo la liebre.
        
        -No es justo -dijo Doña Tortugona-. Pasa tú primero.
        
        -Entremos juntas -dijo la liebre.
        
        Liebre y tortuga cruzaron juntas la línea de meta mientras el público estallaba en aplausos. Nadie más volvió a reírse de la liebre, que recuperó su puesto entre los suyos, a los que demostró que más importante que ganar una carrera es ganar amigos y, sobre todo, perdonarse cuando haces algo mal, por muy humillante que resulte. Y es que solo así conseguirás que los demás te perdonen. Al fin y al cabo, todos valemos mucho más que el resultado de una competición. `,
    
    
    
        // Cuento 3
    
        `
        La pesadilla de los hermanos Green.
        Los gemelos Jacobo y Guillermo llevaban años viajando con sus padres, que formaban parte de una de las compañías de circo más importantes de Europa. Los Green formaban un dúo perfecto sobre el trapecio, un dúo que emocionaba a todo el que los veía volar. Pero debido a una enfermedad de la madre, la familia decidió volver a España e instalarse en la vieja casa familiar.
    
        Jacobo y Guillermo tuvieron que ir a la escuela. Hasta entonces habían aprendido de sus padres y de otros compañeros, siguiendo un programa de estudios especial para niños como ellos. Pero cuando el circo se acabó, los hermanos Green tuvieron que ir a la escuela, como todos los demás. Esto supuso un duro golpe para ellos, pero enfrentaron la nueva situación como reto más.
        
        -Damos la bienvenida a dos nuevos compañeros, Jacobo y Guillermo Green -dijo la maestra el día que los hermanos se incorporaron a clase.
        
        -¡Mira, si tenemos una pareja de escritores entre nosotros! -dijo Antonio, el graciosillo de la clase-. Me encantó el del soldadito de plomo, aunque ese del emperador que sale desnudo a la calle es muy bueno también.
        
        -Esos cuentos son de Andersen -le dijo Jacobo.
        
        -¿De quién? -preguntó Antonio, que se sentó al ver cómo todos se reían de su ignorancia.
        
        -Sentaros, chicos, por favor, vamos a comenzar -dijo la maestra, intentando quitarle hierro al asunto. Pero el asunto estaba al rojo vivo.
        
        -Me las pagaréis, payasos -pensó Antonio.
        
        Durante días, Antonio y sus compinches estuvieron mofándose de los hermanos Green. Al principio Jacobo y Guillermo se lo tomaron como una broma pesada, incluso intentaron seguirles el juego, a ver si se aburrían de una vez, pero tras varios días se dieron cuenta de que había algo que no encajaba.
        
        Un día, Jacobo descubrió lo que pasaba.
        
        -Guillermo, creo que lo que pasa es que confunden nuestro apellido, Green, con el apellido de los famosos escritores alemanes del principio del siglo XIX, los Hermanos Grimm.
        
        -¿No es posible? -dijo Guillermo-. Yo pensé que lo decían por hacer la gracia. Pues menos mal que no se han dado cuenta que nuestros nombres en español son los de los Hermanos Grimm pero traducidos al español, Jacob y Wilhelm, que si no….
        
        -Tendríamos que decírselo, ¿no te parece? -dijo Jacobo.
        
        Los hermanos Green explicaron a sus compañeros las diferencias entre Grimm y Green, pero para su sorpresa, Antonio se enfadó aún más.
        
        -No pasa nada, hombre, es una pequeña equivocación -dijo Jacobo, intentando apaciguar a Antonio. Pero este, sin mediar palabra, se le echó encima.
        
        A Jacobo le dio tiempo a esquivar a Antonio, que se dio un buen trompazo contra el suelo. Esto hizo reír a todos los que lo habían presenciado y atrajo las miradas de otros niños.
        
        -¡Vámonos, corre! -dijo Guillermo a su hermano.
        
        Y ambos se marcharon de allí, mientras Antonio les gritaba:
        
        -La próxima vez no tendréis tanta suerte.
        
        Jacobo y Guillermo intentaron evitar a Antonio y a sus secuaces todo lo que pudieron, pero al final les pillaron a la salida del colegio y les rodearon.
        
        -Somos ocho contra dos -dijo Antonio-. A ver qué hacéis ahora.
        
        Jacobo y Guillermo se miraron. Uno dijo:
        
        -Tocamos a cuatro.
        
        -Intentemos no pegarles, que luego nos la cargamos nosotLa pesadilla de los hermanos Greenros.
        
        Nadie lo sabía, pero Jacobo y Guillermo eran expertos en artes marciales. En el circo habían hecho interesantes números de lucha acrobática. Y sin tocarles un pelo, consiguieron dejarlos a todos K.O.
        
        -¿No crees que deberíamos dejar esto ya, Antonio? -dijo Jacobo.
        
        -Hagamos las paces -insistió Guillermo.
        
        -¿Las paces? ¿Y quedar como un pringao? -dijo Antonio.
        
        -No digas bobadas -dijo Jacobo-, no vas a quedar como un pringao. Si insistes en meterte con nosotros y vuelves a… en fin, si nosotros….
        
        -Está bien, hagamos las paces -dijo Antonio, dándose cuenta de que pegarse con ellos no iba a ninguna parte-. ¡Pero vais a tener que ayudarnos a explicar todos estos golpes!
        
        -¡Claro! Siempre podemos decir que os enseñábamos artes marciales -dijo Guillermo.
        
        -¡Eso nos hará parecer guays! ¡Buena idea! -dijo Antonio. Y todos se fueron a dar una vuelta.
        
        -¿Habrá terminado la pesadilla? -preguntó Jacobo a su hermano.
        
        -Para nosotros tal vez sí, pero para miles de niños en este país y en otros mucho me temo que no. `,
    
    
    
        // Cuento 4
    
    
        `El misterio de las castañas. 
        A Julio le encantaban las castañas. Eran sus frutos secos favoritos. Le gustaba comerlas crudas, asadas, cocidas, confitadas o en almíbar. De todas las formas posibles. De hecho, si le dejasen, las comería a todas horas. Cada año, Julio esperaba impaciente la época de las castañas.
    
        Desde octubre y hasta mediados de diciembre, muchos fines de semana iba con sus primos al bosque a coger bolsas y bolsas que después repartía entre los vecinos. Muchas veces en su casa las usaban para preparar mermelada o crema para rellenar las tartas.
        
        A veces montaba un pequeño puesto en la entrada de su casa y vendía cucuruchos de castañas asadas a las personas que pasaban por la calle. Como las vendía muy baratas casi todo el mundo le compraba y enseguida tenía que ir a casa a asar más. Le encantaba pasar las tardes así, disfrutando del olor de las castañas al salir del horno y charlando con la gente que se detenía en su pequeño puesto callejero.
        
        Un día, recorriendo el interior del bosque en busca de castañas, Julio encontró algo muy extraño: un montón de erizos, la parte de fuera de la castaña, la que está plagada de pinchos. Lo realmente sorprendente fue que estaban vacíos. Julio sabía que cada erizo solía tener más o menos 2 o 3 castañas. Pero estos con los que se encontró estaban huecos. Ni rastro de las castañas que había ido a buscar.
        
        Julio, que había ido al bosque con su primo y su tío Pablo, fue rápidamente a avisarles. Pronto pudieron ver lo mismo que había descubierto el niño. Ninguna castaña, ni en el suelo ni en los árboles. Fueron a avisar al guardabosques. Le explicaron lo que pasaba y le pidieron que les ayudase.
        
        EEl misterio de las castañasl hombre les comentó que a veces las ardillas se llevaban muchas castañas, pero que en este caso era raro, porque no había ninguna. Llamó a la policía porque el bosque era muy grande para recorrerlo él solo. Al cabo de 3 horas mirando en cada rincón, encontraron la respuesta a todo el misterio. Una nueva fábrica de dulce de castañas se las había llevado todas para aumentar la producción. Habían empezado a vender su dulce en otros países y tenían que fabricar muchos tarros al cabo del día.
        
        Al final, los dueños de la fábrica entendieron que no podían llevarse todas las castañas del bosque porque la gente del pueblo también quería cogerlas. Llegaron a un acuerdo para repartirlas. Un acuerdo justo para todos que a Julio le permitió volver a comer castañas cada otoño y a pasar tardes divertidas en el bosque recogiéndolas. `,
    
    
        // Cuento 5
    
        `
        El cuervo y las palomas.
        Había una vez un cuervo solitario que miraba con envidia a las hermosas palomas. ¡La blancura de sus plumas era tan hermosa al lado de su horrible y tétrico plumaje! Las palomas, al sentirse observadas y admiradas, presumían de su belleza ante su vecino cuervo, al que miraban con desdén y desprecio.
    
        -¡Qué hermosas son las palomas blancas! -suspiraba el cuervo-. ¿Quién fuera paloma para disfrutar de tanta belleza?
        
        Un día al cuervo se le ocurrió pintarse de blanco y colarse en el palomar. Decidido a hacerse pasar por paloma, el cuervo se coló en el molino y se dio un buen baño de harina. Cuando se vio bien embadurnado, el cuervo echó a volar. Cuando llegó al palomar ninguna paloma se dio cuenta del engaño. Pero ese día empezó a llover y el agua se llevó toda la harina, dejando al descubierto el negro plumaje del cuervo.
        
        -¡Fuera, impostor, vete de aquí! -gritaron las palomas.
        
        El cuervo se fue volando tan rápido como pudo, temeroso de ser atacado por cientos de palomas rabiosas. Cuando llegó a su guarida el cuervo, por fin, pudo tomarse un descanso. Pero poco tardó el cuervo en empezar a pensar en otra forma de conseguir que sus plumas fueran blancas.
        
        -Me las pintaré con pintura blanca -pensó el cuervo. Y rápidamente se coló en el almacén de un pintor y se dio un buen baño en pintura blanca.
        
        Cuando estuvo listo, el cuervo voló de nuevo al palomar, donde ninguna de las palomas se dio cuenta del nuevo engaño. Durante unos días el cuervo se quedó con ellas, pero sin perder de vista el cielo, por si volvía a llover, para poder esconderse del agua..
        
        Pero un día, mientras el cuervo disfrazado de paloma jugaba con sus nuevas compañeras en una plaza, cerca de una fuente, un niño cogió un cubo de agua y se lo lanzó a las palomas. La pintura empezó a caerse de las plumas del cuervo que, sabiéndose descubierto, huyó sin más.
        
        -Tengo que encontrar la forma de que mis plumas se vuelvan blancas para siempre -pensó el cuervo. Y tuvo otra de sus grandes ideas. ¡Desteñirse las plumas con lejía!
        
        El cuervo buscó una lavandería y, aprovechando un despiste de los trabajadores, se dio un baño de lejía. Sus plumas quedaron de un blanco inmaculado.
        
        -El blanco de mis plumas será la envidia de las demás palomas -pensó el cuervo. Y salió volando al palomar.
        
        Los días pasaron y ninguna de las palomas de dio cuenta del regreso del cuervo. El cuervo se fue acostumbrando y, poco a poco, olvidó que era un cuervo y no una paloma.El cuervo y las palomas Hasta que un día se relajó tanto que olvidó que, por muy blancas que fueran sus plumas, su graznido nunca sería tan dulce como el ulular de las palomas, y al abrir el pico para decir algo:
        
        -¡Cruaaac-cruaaac!
        
        Las palomas se quedaron mirando al cuervo que, al darse cuenta de su error, salió volando.
        
        El cuervo se refugió en su guarida, pero cuando los otros cuervos lo vieron no fueron capaces de reconocerlo, por lo que lo echaron de allí.
        
        Tiempo después las palomas fueron a buscar al cuervo y le invitaron a vivir con ellas, pues tanta insistencia y admiración ablandó su corazón. Solo le pusieron una condición: que aprendiera a emitir un sonido algo más parecido al que hacen las palomas. El cuervo se comprometió a intentarlo. Y así vivió feliz entre sus nuevas amigas durante muchos años. `
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