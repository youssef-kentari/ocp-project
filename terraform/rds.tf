resource "aws_db_instance" "mysql" {
  identifier        = "ocp-database"
  allocated_storage = 20
  engine            = "mysql"
  engine_version    = "8.0"
  instance_class    = "db.t3.micro"
  username          = "root"
  password          = var.db_password
  db_subnet_group_name = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot = true
}

resource "aws_db_subnet_group" "main" {
  name       = "ocp-database-subnet-group"
  subnet_ids = [aws_subnet.public.id, aws_subnet.private.id]
}
