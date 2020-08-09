class ChurchSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :place
end
