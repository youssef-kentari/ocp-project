resource "aws_instance" "backend" {
  ami                         = "ami-08c40ec9ead489470" # Ubuntu 22.04
  instance_type               = "t3.micro"
  subnet_id                   = aws_subnet.private.id
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = false

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y docker.io
              docker run -d -p 80:3000 \
                -e DB_HOST=${aws_db_instance.mysql.address} \
                -e DB_USER=admin \
                -e DB_PASS=${var.db_password} \
                youssefkentari/express-backend:latest
              EOF
}

