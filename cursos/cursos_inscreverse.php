<?

require_once('../Connections/jenova.php');
?>

<div class="modal-header">
	<button type="button" id="fecha" class="close" data-dismiss="modal" aria-hidden="true">
		&times;
	</button>    
	<h4 class="modal-title" id="myModalLabel"> <i class="fa  fa-pencil-square-o"> </i> Inscrever-se</h4>
</div>

<div class="modal-body smart-form " style="margin-button:10px;" >
<div class="row">


<section class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <label class="input">Nome
            <input type="text" class="input_forme" id="campo_01" autofocus>
            </label>
</section>

<section class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <label class="input">Apelido
            <input type="text" class="input_forme" id="campo_02" >
            </label>
</section>

<section class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <label class="input">Aniversário
            <input type="tel" class="input_forme" id="campo_03" >
            </label>
</section>

<section class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <label class="input">CPF
            <input type="text" class="input_forme" id="campo_04" >
            </label>
</section>

<section class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <label class="input">Telefone
            <input type="tel" class="input_forme" id="campo_05" >
            </label>
</section>




<section class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <label class="input">E-mail
            <input type="email" class="input_forme" id="campo_06" >
            </label>
</section>

<section class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <label class="input">Turma
            <Select class="input_forme" id="campo_07" >
			<option value="1"> 10-11-2017 a 11-11-2017 (Indisponível)</option> 
			<option value="1"> 17-11-2017 a 18-11-2017 (Indisponível)</option> 
			<option value="1"> 01-12-2017 a 02-12-2017 </option> 
			<option value="0"> Avise-me quando houver novas turmas</option> 
			</select>
			
            </label>
</section>

<section class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <label class="input">Cod. Desconto
            <input type="tel" class="input_forme" id="campo_08" >
            </label>
</section>

</div>


</div>
<div class="modal-footer ">




    


</div>




	
<script type="text/javascript">



function keyPressed(evt){
			evt = evt || window.event;
			var key = evt.keyCode || evt.which;
			
			return key
			
			}
			
			document.onkeypress = function(evt) {
			var str = keyPressed(evt);
			if(str == 13) $('#gravar').click();
			
			
			};


	function atualizar() {
		
		event.preventDefault();
		
		$("#source_form").validate({  
         rules: {
			campo_02	: {required : true},
			campo_03 	: {required : true},
			campo_05 	: {required : true},
			campo_06 	: {required : true},
			
			
					},
		messages : 	{
			campo_02 	: {required : ''},
			campo_03 	: {required : ''},
			campo_05 	: {required : ''},
			campo_06 	: {required : ''},
			
			}
					
	 });
	
        
		if ($('#source_form').valid()) {
										
		$.ajax({

        type: 'POST',
        url: 'modulos/crm/chamadas_novo_insert.php',
        data: {	
			
				campo_01:  $("#campo_01").val(),
				campo_02:  $("#campo_02").val(),
				campo_03:  $("#campo_03").val(),
				campo_04:  $("#campo_04").val(),
				campo_05:  $("#campo_05").val(),
				campo_06:  $("#campo_06").val(),
				campo_07:  $("#campo_07").val(),
				campo_08:  $("#campo_08").val(),
										
			
			},
		
		success: function(e){
			
					$("#retorna").html(e);
					$(".modal-content").load('/limpo.php');
					$("#fecha").trigger('click');
					$("#conteudo").load('modulos/crm/chamadas_list_box.php')	
					
							}
			})
           
		   
		   
        } 
    };
	

</script>



