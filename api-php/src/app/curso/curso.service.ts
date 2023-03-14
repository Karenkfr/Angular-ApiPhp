import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from'@angular/common/http';
import { Curso } from './curso';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CursoService {     //aqui regra de negocio entre o php  e o angular//

  url = "http://localhost/api/php/";   //url toda vez que quiser fazer uma requisição, chame essa variavel//


  //toda vez que for selecionar os cursos, tem que armazenar em algum lugar, e será aqui nessa variavel
  
  vetor:Curso[];    //guardará todos os cursos//

  constructor(
    private http:HttpClient   //com ele é que fazemos as requisições no php como backend//
  ) { }

   //listar                 // o osbervable vai trabalhar com o tipo de informacao do tipo Curso, ele vai trabalhar com varios cursos []
  obterCursos():Observable<Curso[]>{   //Observable - vai listar todos os compoments, vai pegar lá no php todas as linhas e em cada linha acessar e colunas
    
    return this.http.get(this.url+"listar")   //vai acessar e trazer, um observable do arquivo (listar) um conjunto de dados que pertence a um curso //
    .pipe( map((res) =>{    //pipe - vai pegar os arquivos de forma linear 1, 2 , 3 , e o map- vai vai trabalhar com as colunas
            //res  - reposta
            
     this.vetor = res['cursos'];
        return this.vetor;
      }
      )
    )
  }                   
      //funcao     //objeto     //retorno
    cadastrarCurso(c:Curso): Observable<Curso[]>{    //esse cursos abaixo, e o jason do php//
      
      return this.http.post(this.url+'cadastrar', {cursos:c}).pipe(   //percorre a linha//
        map((res) => {   //percorre a coluna//
          this.vetor.push(res['cursos']);  //o vetor vai armazenar resposta , e resposta retoran ojson cursos//
          return this.vetor;
        })
      )
    }


//excluir
   removerCurso(c:Curso): Observable<Curso[]>{

                                      //nome do json que o php está prourando
  const params = new HttpParams().set("idCurso", c.idCurso.toString());  

    return this.http.delete(this.url+'excluir', {params: params}).pipe(
      map((res)=>{
        const filtro = this.vetor.filter((curso)=> {   //percorre cada elemento do array
return +curso['idCurso'] !== +c.idCurso;
        });
        return this.vetor = filtro;
         }) )
    }



//alterar
    atualizarCurso(c:Curso): Observable<Curso[]>{
     return this.http.put(this.url+'alterar', {cursos: c})
     .pipe(map((res)=>{
      const cursoAlterado = this.vetor.find((item)=>{
        return +item['idCurso'] === +['idCurso'];
      });
        if (cursoAlterado){
          cursoAlterado['nomeCurso'] = c['nomeCurso'];
          cursoAlterado['valorCurso'] = c['valorCurso'];
        }
      
             return this.vetor;
    }))

    }
  }