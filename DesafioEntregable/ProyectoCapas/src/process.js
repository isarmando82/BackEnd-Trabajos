import { Command } from "commander";

const program = new Command();

program
    .option ('-d', "variable de debug", false)
    .option ('-p <PORT>', "variable de puerto", 8080)
    .option ('--mode <mode>', "Modo de trabajo", "dev")
    .option ('-u <user>', 'Usuario que va a utilizar la app', 'No se declaro ningun usuario')
    program.parse();



export default program;