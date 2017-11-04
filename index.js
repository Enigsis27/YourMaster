const Discord = require("discord.js")
var bot = new Discord.Client();

const token = "Mzc1NDA3MjI2NjUyOTgzMzA2.DNvZ8Q.T-qLByTJagYtI9lscJ1EEIJUBCo"

var prefix = "-"

var turno = 0;
var pelea = 0;

function random (num1, num2)
{
    return Math.floor((Math.random() * num1) + num2) 
}
var boss = 
{
    nombre: 0,
    apellido: 0,
    vida: 0,
    daño: 0,
    SA: 0,
    frase: 0,
    on: false,
}

var crearboss = 
{
    nombre: ["Bárendd" , "Bróttor" , "Eberk" , "Éinkil" , "Óskar",  "Rúrik" , "Taklinn" , "Tordek" , "Traubon" , "Úlfgar" , "Veit"],
    apellido: ['Bálderk', 'Dánkil' , 'Gorunn' , 'Hólderhek' , 'Lóder' , 'Lútgehr' , 'Ungart' , 'Torunn' , 'Strakeln'],
    SA: ['Regeneración' , 'Huida' , 'Doble Armadura' ,  'Doble daño' , 'Lanzallamas' , 'Congelación'],
    frase:  ['El pastel es mentira', 'La guerra. La guerra nunca cambia' , 'El hombre adecuado en el sitio equivocado puede cambiar el rumbo del mundo' ,
    "Let's Rock, baby", 'Al final, ¿Qué distingue al hombre libre del esclavo? ¿Dinero? ¿Poder? No. El hombre elige. El esclavo obedece',
    'Hail to the king, baby!', 'Me siento como si pudiera… ¡conquistar el mundo!' , '¿Hasta dónde estás dispuesto a llegar para salvar a los que más quieres?',
    'La mitad de lo que conocemos es mentira... La otra mitad, una mentira bien construida' , 'Game Over'],
        
   
    }
var stats = []

function crear(nombre, apellido, vida, daño, SA, frase)
{
    var nboss = new Discord.RichEmbed()
    .setColor(0x2980B9)
    .setAuthor(nombre + " " + apellido)
    .addField("Vida: ", vida)
    .addField("Daño: ", daño)
    .addField("Habilidad Especial", SA)
    .setFooter(frase)
    
    return nboss;
}


bot.on ("ready", () => 
{
    console.log("ready")
});

bot.on("message", function (msg)
{
    var pj =
    {
        nombre: msg.author,
        vida: 50,
        daño: 10,
        espera: true,
    
        atacar: function (daño, vida)
        {
            return vida-daño;
        }
    }

    if (msg.content.startsWith(prefix))
    var args = msg.content.substring(prefix.length).toLowerCase();    
    
    {
        if (args == "pj")
        {
            msg.delete()
            var m = 0;
            for (element of stats)
            
            {
            if (msg.author === element.nombre)
            {
                msg.channel.send("Usuario: " + element.nombre + "\n" + "Vida: "+ element.vida + "\n" + "Daño: " + element.daño)
            }
            else 
            {
                m++;
            }
            }
            if (m == stats.length  || !stats)
            {
                stats.push(pj)
                msg.channel.send("Usuario: " + msg.author + "\n" + "Vida: "+ 50 + "\n" + "Daño: " + 10)  
            }
        }

        if (args == "boss")
        {
            msg.delete()
            if (!boss.on)
            {
            boss.nombre = crearboss.nombre[random(10,0)]
            boss.apellido = crearboss.apellido[random(9,0)]
            boss.vida = random(15,35)
            boss.daño = random(15, 10)
            var sa = random(5,0)
            boss.SA = crearboss.SA[sa]
            boss.frase = crearboss.frase[random(9,0)]
            boss.on = true;

            switch (sa)
            {
                case 0:
                msg.channel.send(crear(boss.nombre, boss.apellido, boss.vida, boss.daño, boss.SA, boss.frase))
                break;

                case 1:
                msg.channel.send(crear(boss.nombre, boss.apellido, boss.vida, boss.daño, boss.SA, boss.frase))
                break;

                case 2:
                msg.channel.send(crear(boss.nombre, boss.apellido, boss.vida, boss.daño, boss.SA, boss.frase))
                break;

                case 3:
                msg.channel.send(crear(boss.nombre, boss.apellido, boss.vida, boss.daño, boss.SA, boss.frase))
                break;

                case 4:
                msg.channel.send(crear(boss.nombre, boss.apellido, boss.vida, boss.daño, boss.SA, boss.frase))
                break;

                case 5:
                msg.channel.send(crear(boss.nombre, boss.apellido, boss.vida, boss.daño, boss.SA, boss.frase))
                break;
            } 
            }
            
            else if (boss.on)
            {
                msg.channel.send("Nombre: " + boss.nombre + " " + boss.apellido + "\n" + "Vida: " + boss.vida + "\n" + "Daño: " + boss.daño + "\n" + "Habilidad Especial: " + boss.SA)
            }
            
        }

        if (args == "ataque")
        {
            for (element of stats)
            {
                console.log("wii")
                if (element.vida <= 0)
                {
                    pelea++
                }
                console.log(pelea)
                console.log(boss.vida)
                console.log(boss.on)
            }
            if (pelea != stats.length && boss.vida >= 0 && boss.on == true)
            {
                console.log("hey")
            for (element of stats)
            {
                if (msg.author === element.nombre && element.espera)
                {
                    var v = random (10,1) 
                    var m = boss.vida-v
                    msg.channel.send("Nombre: " + boss.nombre + " " + boss.apellido + "\n" + "Vida: " + boss.vida + " " + "-"+ " "+ v + " "+ "="+ " " + m + "\n" + "Daño: " + boss.daño + "\n" + "Habilidad Especial: " + boss.SA)
                    boss.vida = m;
                    element.espera = false;
                    turno++;
                    
                }
            }
            if (turno == stats.length)
            {
                var z = random(stats.length,0)
                 var zar = stats[z].vida - random(boss.daño,0)
                 stats[z].vida = zar
                 turno = 0
                 for (element of stats)
                 {
                     element.espera = true;
                 }    
            }
        }   
        else 
        {
             msg.channel.send("Ya terminó la batalla(Beta)") 
        }
        }
        
    }
});

bot.login(token)


