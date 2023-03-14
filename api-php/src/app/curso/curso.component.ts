import { Component, OnInit } from '@angular/core';
import { HttpClient} from'@angular/common/http';
import { Curso } from './curso';
import { CursoService } from './curso.service';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

//toda vez que for selecionar os cursos, tem que armazenar em algum lugar, e será aqui nessa variavel//
  
vetor:Curso[];    //guardará todos os cursos da requisicao da selecao//


  curso = new Curso();   // objeto da classe curso,  quando for listar //


  constructor(
    private http:HttpClient,   //com ele é que fazemos as requisições php//
    private curso_service:CursoService
  ){

  }
 
  ngOnInit() {
    this.selecionar();   // ao abrir a aplicacao exibirá os cursos//
  }



  cadastro(){
    this.curso_service.cadastrarCurso(this.curso).subscribe(
      (res:Curso[])=>{
        this.vetor = res;

        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;
        
        this.selecionar();

      }
    )

  }

  selecionar(){                         //res - resposta do metodo da camada de serviço//
    this.curso_service.obterCursos().subscribe(    //subscribe pega todos os dados no metodo da camada de serviço e vamos ter acesso a elas//
      (res: Curso[]) => {   //resposta do metodo que esta em service//
        this.vetor = res;
      }
      )
     }

  alterar(){
    this.curso_service.atualizarCurso(this.curso).subscribe(
      (res)=>{
        this.vetor = res;

        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;

        this.selecionar();
      }
    )


  }

  remover(){
   this.curso_service.removerCurso(this.curso).subscribe(
    (res:Curso[])=> {
      this.vetor = res;

      this.curso.nomeCurso = null;     
      this.curso.valorCurso = null;   
    }
   )
   
  }

  selecionarCurso(c:Curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;

  }
}
