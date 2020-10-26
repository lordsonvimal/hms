class ExamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :max, :pass
  attribute :ranks do |object|
    []
  end
end
