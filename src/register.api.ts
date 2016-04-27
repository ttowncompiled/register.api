import { ChromeBrowser } from './lib/xhr';
import { InjectableSupply } from './injectable-supply';
import { ModuleCache } from './module-cache';
import { Registrar } from './registrar';

function $registrarFactory() : Registrar {
  return new Registrar(new InjectableSupply(), new ModuleCache(new ChromeBrowser()));
}

export var System : Registrar = $registrarFactory();
