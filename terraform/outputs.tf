output "s3_bucket_name" {
  value = aws_s3_bucket.frontend.bucket
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.frontend_cdn.id
}

output "alb_dns" {
  value = aws_lb.alb.dns_name
}

output "ec2_private_ip" {
  value = aws_instance.backend.private_ip
}

output "db_host" {
  value = aws_db_instance.mysql.address
}
