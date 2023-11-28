<?php 

	class conection{
		
		private $con;			

		public function conection(){		
		}
		public function turnOn(){			
			try{
				$this->con = new mysqli("localhost","root","","bokayac");
				$this->con->set_charset("utf8");			
				if($this->con->connect_error){	
					die("error");	
				}
				else{
	
					return $this->con;	
				}
			}	
			catch(Exception){
				die("error");
			}	
		}	
        public function turnOff(){
            $this->con->close();
        }
	}
?>