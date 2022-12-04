function envia_formulario(id_campo, nome_unico, id_file, url_recebe, url_retorna, id_retorna, fechar  ){
	
	id_campo   	= id_campo.split(','); /*id dos campos a serem passados para o input*/	
	id_file		= id_file.split(',');
	nome_unico =  nome_unico.split(',');
    formData = new FormData();
	
	/* laço que paga os arquivos do id_file */
	$.each(id_file, function(key, campo) {$("#"+campo+"\\[\\]").each(function(nr, valor) {formData.append('arquivo_' + nr , $(this)[0].files[0]);})})
	
	$.each(id_campo, function(key, campo) { /* laço que varre os campos*/	 
		
		//console.log(id_campo[key])
		$("#"+campo+"\\[\\]").each(function(nr, valor) {/* laço que paga o valor e tipo dos campos*/	
					
				type = $(this).attr('type');
				tipo = 'null';
				valor = 'null';					
				if ($(this).attr('tipo'))				{ tipo = $(this).attr('tipo');}
				if(type == 'checkbox')					{ if ($(this).is(":checked")){ valor= $(this).val(); }}
				if(type != 'checkbox')					{ valor = $(this).val();}
				if(valor != null)						{ valor = valor;}
				if(valor == null || valor == '' )		{ valor = 'null';}
				if(tipo.match(/data/)  && valor != 'null'){ valor = valor.split("-").reverse().join("-");}
				if(tipo.match(/data/)  && valor != 'null'){ valor = valor.split("/").reverse().join("/");}
				if(tipo.match(/moeda/) && valor != 'null'){ valor = valor.replace(",", ".");}
				if(tipo.match(/numero/)&& valor != 'null'){ valor = valor.replace(/[^0-9]/g,'');}
				if(tipo.match(/hora/)&& valor != 'null'){ valor = hora_para_segundo(valor);}
				if(valor != 'null') { valor = '"' + valor + '"';} 	
				if(tipo.match(/pmaiuscula/)&& valor != 'null'){ valor = 'jenova.primeira_maiuscula(' + valor + ')';}	
				
				formData.append(id_campo[key]+'[]', valor);	
				formData.append(id_campo[key]+'_tipo[]', tipo);	
				
				});
				
		})  
	 			
		//valida campos com class  'requerido', obs: o id deve ser unico 
		$.validator.setDefaults({ ignore: ":hidden:not('select')" });
		$.validator.messages.required = '';
		jQuery.validator.addClassRules('requerido', {required: true}); 
	
	
		//Valida input quando tem setado um valor para valida_unico_xx		
		$.each(nome_unico, function(key, nome) { verifica_qtd(nome);})
		
			
		verifica_hidden()
		
		//sendo validado efetua postagem 
		if ($('#contact-form').valid() && !$("#gravar").hasClass("concluido")) {
			
			if (fechar == 1) {	
			$("#gravar").addClass("concluido"); 
			$('#gravar').change();}
			
			rollSound = new Audio("/sound/smallbox.mp3");
			rollSound.play();
			
			setTimeout(  function(){
				
			$.ajax({
			mimeType: "multipart/form-data",
			type: 'POST',			
			url: url_recebe,
			data: formData,
			contentType: false,
            cache: false,
            processData: false,
					
			success: function(e){ $("#"+id_retorna).html(e);},							
				})
				
			},150)
				
			
			
	} 	
		
			
  
  
   }
   
   
   /*--------------------*/
   function verifica_qtd(campo){
	
	
			tipo = []; // initialize empty array 
			xxx = campo+"[]";
			$("[name='"+campo+"[]']:checked").each(function(){
			tipo.push($(this).val());
			});
			
			if(tipo.length > 0)	{ $("[name='"+campo+"[]']").parent().removeClass("state-error");
								  $("[name='"+campo+"[]']").parent().addClass("state-success");
								  $("[name='"+campo+"[]']").removeClass("requerido");									  
								  
								  }
			if(tipo.length == 0){ $("[name='"+campo+"[]']").parent().removeClass("state-success");	
								  $("[name='"+campo+"[]']").parent().addClass("state-error");
								  $("[name='"+campo+"[]']").addClass("requerido");	
								  }
								  
		$("#source_form").validate({  
          rules: {  xxx: { required: true, minlength: 1  }  }, 
		  messages: { xxx: "" } 
					
	 });
}

function verifica_hidden(){

	//valida campos com class  'requerido', obs: o id deve ser unico 
		$.validator.setDefaults({ ignore: ":hidden:not('select')" });
		$.validator.messages.required = '';
		jQuery.validator.addClassRules('requerido', {required: true}); 

	
	setTimeout(  function(){
				invalida_ocultos = $('.busca select.invalid').parent()
				$.each(invalida_ocultos, function(index, value){
					$(value).find('button').addClass('invalid')
					$(value).find('button').removeClass('valid')
					
				});

				valida_ocultos = $('.busca select.valid').parent()
				$.each(valida_ocultos, function(index, value){
					$(value).find('button').removeClass('invalid')
					$(value).find('button').addClass('valid')
								
				});		
	},150)
	
}

/*---Envia Email---------------------------------------------*/
function api_envia_email(hostSMTP, portSMTP,userSMPT,passSMTP, remetente_nome, destinatario_email, msg_assunto, msg_texto ){
		
		$.ajax	({
			async: true,
			type: 'POST',			
			url: '/php/envia_email.php',
			data: {	
				hostSMTP: hostSMTP,
				portSMTP: portSMTP,
				userSMPT: userSMPT,
				passSMTP: passSMTP,
				remetente_nome: remetente_nome,
				destinatario_email: destinatario_email,
				msg_assunto: msg_assunto,
				msg_texto: msg_texto							
				},			
			success: function(e){ $('#retorna').html(e)
			
			}			
			})
	
}